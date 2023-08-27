export type ResumeApiCodes = "PROFILES" | "ME" | "PROFILE" | "AI_PROFILE";
export type ApiConfigDefinition = {
    url: string;
    requiresAuthentication?: boolean;
    version?: number;
};

const ApiConfigurations: Record<string, Record<ResumeApiCodes, ApiConfigDefinition>> = {
    RESUMES: {
        ME: {
            url: "",
            requiresAuthentication: false,
        },
        PROFILES: {
            url: "profiles",
        },
        PROFILE: {
            url: "profiles/:id",
        },
        AI_PROFILE: {
            url: "ai/profile",
        },
    },
};

const exportsConfigurations: Record<string, any> = {
    "ENDPOINTS.RESUMES": "/api/",
};

const defaults = {
    version: 1,
    requiresAuthentication: true,
};

for (var system in ApiConfigurations) {
    for (var code in ApiConfigurations[system]) {
        const apiCode = `APIS.${system}.${code}`;
        const configuration = (ApiConfigurations as any)[system][code] ?? {};
        exportsConfigurations[apiCode] = { ...defaults, ...configuration };
    }
}

export const ApiCodes = exportsConfigurations;
