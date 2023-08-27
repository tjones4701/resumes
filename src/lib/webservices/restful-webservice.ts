import appStore from "@src/utilities/local-store";
import { Webservice, WebserviceResponse } from "./Webservice";

export class RestfulWebservice extends Webservice {
    url: string | null = null;
    cacheDuration = null;

    constructor(url: string | null, options: any = null) {
        super();
        this.setOptions(url, options);
    }

    setOptions(url: any, options: any) {
        if (url != null) {
            if (options?.useConfig ?? true) {
                this.url = appStore.get(url);
            } else {
                this.url = url;
            }
        } else {
            this.url = null;
        }
    }

    getUrl() {
        return this.url;
    }

    buildUrl(url: string | null, params: string | any): string | null {
        url = this.getUrl();
        return super.buildUrl(url, params);
    }

    replaceUrlParams(url: string | null, params: any) {
        if (url == null) {
            return null;
        }
        for (const i in params) {
            const key = `:${i}`;
            url = url.replaceAll(key, params[i]);
        }
        return url;
    }

    async getConfig(config: any) {
        return config;
    }

    async get(params: any = null, config: any = null): Promise<WebserviceResponse> {
        const url = this.buildUrl(null, params);
        return this.request("get", url, params, await this.getConfig(config));
    }
    async post(data: any = null, config: any = null): Promise<WebserviceResponse> {
        return this.request("post", this.replaceUrlParams(this.getUrl(), data), data, await this.getConfig(config));
    }
    async patch(data: any = null, config: any = null): Promise<WebserviceResponse> {
        return this.request("patch", this.replaceUrlParams(this.getUrl(), data), data, await this.getConfig(config));
    }

    async save(data: any = null, config: any = null): Promise<WebserviceResponse> {
        if (data.id != null) {
            this.url = this.url + "/" + data.id;
            delete data.id;
            return this.patch(data, config);
        } else {
            return this.post(data, config);
        }
    }
}
