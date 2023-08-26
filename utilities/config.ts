import { ConfigData } from "./config/configData";
import { LocalConfigData } from "./config/env/local";
import { ProductionLocalConfigData } from "./config/env/production";
import { parseNumber } from "./parse-number";
const environments: any = {
    development: LocalConfigData,
    production: ProductionLocalConfigData,
};

const environment: any = process?.env?.environment ?? process?.env?.NODE_ENV ?? environments?.production ?? {};

const environmentVars = environments[environment];

const configItems = { ...ConfigData, ...environmentVars };
class configHandler {
    configItems: any = {};
    constructor(configItems: any) {
        this.configItems = {};
        for (const key in configItems) {
            const value = configItems[key];
            this.add(key, value);
        }
    }

    add(key: string, value: any) {
        this.configItems[key.toLowerCase()] = value;
    }

    get(key: string, def: any = null): any {
        def = process.env[key?.toUpperCase()] ?? def;
        if (this.configItems != null) {
            key = key.toLowerCase();
            return this.configItems[key] ?? def;
        }
        return def;
    }
    getNumber(key: string, def: number | null = null): any {
        return parseNumber(this.get(key, def));
    }

    getAll() {
        return this.configItems;
    }
}

export const ApplicationConfig = new configHandler(configItems);

export type ConfigurationKeys = "AUTH_JWT_SECRET"
| "AWS_ACCESS_KEY_VALUE"
| "AWS_ACCESS_SECRET"
| "OPENAI_API_KEY"
| "ZILLIZ_TOKEN"
| "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY"
| "GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL"
| "GOOGLE_SERVICE_ACCOUNT_CLIENT_ID"
| "ATLASSIAN_API_TOKEN"
| "ZILLIZ_ENDPOINT";

export function getConfigValue(key: ConfigurationKeys, def: any = null) {
    return ApplicationConfig.get(key, def);
}