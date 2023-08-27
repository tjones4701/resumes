import { ApiCodes, ResumeApiCodes } from "@src/client/app-data/apiCodes";
import { RestfulWebservice } from "@src/lib/webservices/restful-webservice";
import { ApplicationConfig } from "@src/utilities/config";
import { useAsync } from "react-use";

for (const i in ApiCodes) {
    ApplicationConfig.add(i, ApiCodes[i]);
}

console.log(ApplicationConfig);

export class ResumesWebserviceResponse {
    request: any = null;
    wasCached = false;
    constructor(request: any, wasCached = false) {
        this.request = request;
        this.wasCached = wasCached;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    getResponse() {}

    getData<T>() {
        return this.request?.data as T;
    }
}

export class ResumesWebservice extends RestfulWebservice {
    bearer = null;
    apiCode: string | null = null;
    apiData: any = {};
    isMocking = false;
    apiEndpoint: string | null = null;

    constructor(apiCode: string, options = null) {
        super(null, options);
        const endpointUrl = ApplicationConfig.get("ENDPOINTS.RESUMES");
        const apiData = ApplicationConfig.get(`APIS.RESUMES.${apiCode}`);
        this.apiData = apiData;
        const apiUrl = `/v${apiData?.version ?? 1}/${apiData.url}`;

        this.url = endpointUrl + apiUrl;
    }

    async getConfig(config: any) {
        if (config == null) {
            config = {};
        }
        if (config.headers == null) {
            config.headers = {};
        }

        if (config.timeout == null) {
            const timeout = this.apiData?.timeout;
            if (timeout != null) {
                config.timeout = timeout;
            }
        }
        config.withCredentials = true;

        return config;
    }

    buildUrl(url: string | null, params: string | any) {
        url = url ?? this.getUrl();
        let paramsString = null;
        if (params != null) {
            for (const [key, value] of Object.entries(params)) {
                const param = ":" + key;
                if (url != null) {
                    if (url.includes(param)) {
                        url = url.replaceAll(param, value as any);
                        delete params[key];
                    }
                }
            }
            if (Object.keys(params).length > 0) {
                paramsString = super.toQuery(params);
                url += "?" + paramsString;
            }
        }

        return url;
    }

    async postRequest(data: any, wasCached: boolean = false) {
        return new ResumesWebserviceResponse(data, wasCached);
    }

    async get(params: any = null, config: any = null): Promise<ResumesWebserviceResponse> {
        const url = this.buildUrl(null, params);
        try {
            return await this.request("get", url, params, await this.getConfig(config));
        } catch (e) {
            throw e;
        }
    }
}

export function ResumeWS(apiCode: ResumeApiCodes) {
    const ws = new ResumesWebservice(apiCode);
    return ws;
}

export function useResumeWSGet<T>(apiCode: ResumeApiCodes | undefined, params: Record<string, any> = {}) {
    return useAsync(async () => {
        if (apiCode === undefined) {
            return undefined;
        }
        const ws = ResumeWS(apiCode);
        const response = await ws.get(params);
        return response?.getData<T>() as T;
    });
}
