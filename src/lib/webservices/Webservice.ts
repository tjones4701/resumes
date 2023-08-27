import appStore from "@src/utilities/local-store";
import Logger from "@src/utilities/logger";
import axios, { AxiosRequestConfig } from "axios";

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            if (typeof window !== "undefined") {
                //window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export class WebserviceResponse {
    request: any = null;
    wasCached = false;
    constructor(request: any, wasCached = false) {
        this.request = request;
        this.wasCached = wasCached;
    }
    getResponse() {}

    getData() {
        return this.request?.data;
    }
}

export class WebserviceError {
    status: number | null = null;
    code: string | null = null;
    message: string | null = null;
    exception: any = null;
    constructor(status: any, code: string | null = null, message: string | null = null, exception: any = null) {
        this.status = status;
        this.code = code;
        this.message = message;
        this.exception = exception;
    }
    getCode() {
        return this.code;
    }
    getMessage() {
        return this.message;
    }

    getFriendlyMessage(): string {
        const def = "";
        const message = this.message ?? this.exception ?? def;
        return message;
    }
}

export class Webservice {
    logging = false;
    constructor() {
        this.logging = appStore.get("WEBSERVICE_LOGGING", false);
    }
    toQuery(params: any, encodeUri = true) {
        const queryString = Object.keys(params)
            .map((key) => {
                if (encodeUri) {
                    return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
                } else {
                    return key + "=" + params[key];
                }
            })
            .join("&");
        return queryString;
    }

    buildUrl(url: string | null, params: string | any): string | null {
        if (url == null) {
            return null;
        }
        if (params != null) {
            if (params instanceof String) {
                params = this.toQuery(params);
            }
            return url + "?" + params;
        } else {
            return url;
        }
    }
    generateCacheKey(type: string, url: string, data: string) {
        return ("WS_" + type + "_" + url + "_" + JSON.stringify(data)).toLowerCase();
    }

    async get(url: string | null, params: any = null, config: any = null): Promise<WebserviceResponse> {
        url = this.buildUrl(url, params);
        return this.request("GET", url, null, config);
    }
    async post(url: string, data: any = null, config: any = null): Promise<WebserviceResponse> {
        return this.request("POST", url, data, config);
    }
    async patch(url: string, data: any = null, config: any = null): Promise<WebserviceResponse> {
        return this.request("PATCH", url, data, config);
    }

    async postRequest(data: any, wasCached: boolean) {
        return new WebserviceResponse(data, wasCached);
    }

    async postRequestError(status: number, data: any) {
        return new WebserviceError(status, data?.code, data?.description);
    }
    async request(method: string, url: string | null, data: any = null, config: any = null) {
        if (url == null) {
            throw new WebserviceError(500, "ERROR", "URL is null");
        }
        try {
            const options = config ?? {};
            if (options?.timeout === undefined) {
                options.timeout = appStore.get("APP.WEBSERVICE.DEFAULT_TIMEOUT");
            }
            if (options.timeout != null) {
                options.timeoutErrorMessage = "Request timedout";
            }
            if (data != null && options.data == null) {
                options.data = data;
            }
            if (options.data == null) {
                delete options.data;
            }

            let cacheKey = null;
            cacheKey = this.generateCacheKey(method, url, data);

            if (url != null && options.url == null) {
                options.url = url;
            }
            if (method != null && options.method == null) {
                options.method = method;
            }

            let request = null;
            let wasCached = true;
            if (cacheKey != null) {
                request = appStore.get(cacheKey, null);
            }
            options.ignoreCache = true;

            // If the cached data is either empty or we are ignoring the cache then load the request.
            if (request == null || options?.ignoreCache === true) {
                wasCached = false;
                request = await this.makeAxiosRequest(options);
            }

            if (this.logging) {
                Logger.debug(wasCached ? "Cached" : "Not Cached", request);
            }

            const status = request?.status ?? null;
            if (status != null) {
                if (status.toString().startsWith("2")) {
                    if (!wasCached) {
                        // If we have a cache duration that is more than 0 then set it.
                        if ((options?.cacheDuration ?? 0) > 0) {
                            const dataToCache = {
                                data: request.data,
                                status: request.status,
                                statusText: request.statusText,
                            };
                            appStore.set(cacheKey, dataToCache, options?.cacheDuration);
                        }
                    }
                    return this.postRequest(request, wasCached);
                } else {
                    throw await this.postRequestError(status, request?.data?.error);
                }
            } else {
                throw new WebserviceError(400, "ERROR", "Error creating request");
            }
        } catch (e) {
            if (e instanceof WebserviceError) {
                throw e;
            } else {
                Logger.error(e);
                throw new WebserviceError(400, "ERROR", null, e);
            }
        }
    }

    makeAxiosRequest(options: AxiosRequestConfig<any>): Promise<any> {
        try {
            const p = new Promise((resolve) => {
                axios(options).then(
                    (data) => {
                        resolve(data);
                    },
                    (error) => {
                        resolve(error?.response ?? error);
                    }
                );
            });
            return p;
        } catch (e) {
            return new Promise((_resolve, reject) => {
                reject(e);
            });
        }
    }
}
