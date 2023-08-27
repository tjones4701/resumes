import { ApplicationConfig } from "@src/utilities/config";
import { RestfulWebservice } from "@src/lib/webservices/restful-webservice";
import { getManagementRequest } from "../auth0/management-account";

export type Auth0Apis = "OAUTH_TOKEN" | "ROLES";

export const Auth0ConfigurationOptions: any = {
    "APIS.AUTH0.OAUTH_TOKEN": {
        url: "oauth/token",
    },
    "APIS.AUTH0.ROLES": {
        url: "api/v2/users/:userId/roles",
    },
};

export class Auth0WebserviceResponse {
    request: any = null;
    wasCached: any = false;
    constructor(request: any, wasCached = false) {
        this.request = request;
        this.wasCached = wasCached;
    }

    getResponse() {}

    getData() {
        return this.request?.data?.data;
    }
}

export class Auth0Webservice extends RestfulWebservice {
    bearer = null;
    apiCode: Auth0Apis;
    apiData: any = {};
    isMocking = false;

    constructor(apiCode: Auth0Apis, options: any = null) {
        super(null, options);
        const endpointUrl = ApplicationConfig.get("ENDPOINTS.AUTH0");
        const apiData = Auth0ConfigurationOptions[`APIS.AUTH0.${apiCode}`];
        this.apiCode = apiCode;
        this.apiData = apiData;
        const apiUrl = `${apiData.url}`;

        this.url = endpointUrl + apiUrl;
    }

    async getBearer() {
        return getManagementRequest();
    }

    async getConfig(config: any) {
        if (config == null) {
            config = {};
        }
        if (config.headers == null) {
            config.headers = {};
        }
        if (config?.headers?.authorization == null) {
            config.headers.authorization = `Bearer ${await this.getBearer()}`;
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

    buildUrl(url: string | null, params: string | any): string | null {
        url = this.getUrl();
        let paramsString = null;
        if (url == null) {
            return null;
        }
        if (params != null) {
            for (const [key, value] of Object.entries(params)) {
                const param = ":" + key;
                if (url.includes(param)) {
                    url = url?.replaceAll(param, value?.toString() ?? "");
                    delete params[key];
                }
            }
            if (Object.keys(params).length > 0) {
                paramsString = super.toQuery(params);
                url += "?" + paramsString;
            }
        }

        return url;
    }

    async get(params: any = null, config: any = null): Promise<Auth0WebserviceResponse> {
        const url = this.buildUrl(null, params);
        try {
            return await this.request("get", url, params, await this.getConfig(config));
        } catch (e) {
            throw e;
        }
    }
}

export function Auth0WS(apiCode: Auth0Apis) {
    const ws = new Auth0Webservice(apiCode);
    return ws;
}
