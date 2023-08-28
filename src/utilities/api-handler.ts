import { NextApiRequest, NextApiResponse } from "next";
import { forceArray } from "./force-array";
import { getConfigValue } from "./config";
import toJson from "./to-json";
import jwt from "jsonwebtoken";
import { User } from "@src/lib/auth/user";
export type Roles = "AUTHENTICATED" | "PUBLIC" | "GLOBAL_ADMIN";

type QueryParameters = "number" | "string" | "boolean";

export type ModelDefinition<T> = {
    type: T;
    required?: boolean;
    description?: string;
};

export type IOptions = {
    description: string;
    authenticated?: boolean;
    roles: ValidRoles[];
    paths?: string;
    queryParameters?: {
        [key: string]: ModelDefinition<QueryParameters>;
    };

    responses?: {
        [key: number]: {
            [key: string]: ModelDefinition<any>;
        };
    };
};

export type CustomRequest = {
    res: NextApiResponse;
    req: NextApiRequest;
    user: User | null;
    setHeader: (key: string, value: string) => void;
    getQuery: (key: string, value?: string | string[]) => string | string[] | undefined;
    getData: () => Record<string, any> | null;
};

export type CustomRequestError = {
    status: number;
    code: string;
    message: string;
};

/**
 * @throws {{ status: number, code: string, message: string, data: any }}
 */
export function createError(status: number, code: string, message: string, data: any = null): never {
    throw { status: status, code: code, message: message, data: data };
}

const authPrefix = "Bearer ";

type ValidRoles = "PUBLIC" | Roles;

function checkRole(user: User | null, roles: ValidRoles | ValidRoles[]) {
    const rolesArray = forceArray<ValidRoles>(roles);
    if (rolesArray.includes("PUBLIC")) {
        return true;
    }

    if (user == null) {
        return false;
    }

    const userRoles = user?.roles?.map((item) => {
        return item.name.replaceAll(" ", "_").toUpperCase();
    });

    if (userRoles.length > 0) {
        for (const i in rolesArray) {
            const roleToCheck = roles[i];
            if (userRoles.includes(roleToCheck)) {
                return true;
            }
        }
    }

    return false;
}
async function setupUser(req: NextApiRequest): Promise<User | null> {
    let accessToken = (req.headers?.authorization ?? "")?.toString();

    if (accessToken.startsWith(authPrefix)) {
        accessToken = accessToken.substr(authPrefix.length);
    }

    const userRaw = req?.cookies["ai-prototype-user"];
    if (userRaw == null) {
        return null;
    }
    const token = jwt.verify(userRaw, getConfigValue("AUTH_JWT_SECRET"));
    return token as any;
}

function returnJson(res: NextApiResponse, data: any, status = 200) {
    try {
        res.status(status).json(data);
    } catch (e) {
        //console.error(e);
        //console.trace();
    }
}

function returnStringOrObjectOrBuffer(res: NextApiResponse, data: string | Buffer, status = 200) {
    res.status(status).send(data);
}

type apiCallbackFunction = (request: CustomRequest) => Promise<any>;

type CustomApiRequest = NextApiRequest & {
    // getCacheService: CacheInitialiseFunction;
};

export type apiCallback = {
    GET?: apiCallbackFunction;
    POST?: apiCallbackFunction;
    PATCH?: apiCallbackFunction;
    DELETE?: apiCallbackFunction;
};
export class CsvResponse {
    fileName: string;
    data: string;
    constructor(fileName: string, data: string) {
        this.fileName = fileName;
        this.data = data;
    }
}

export type FileResponseData = {
    type: "audio/mp3";
    length?: number;
    payload: any;
};

export class FileResponse {
    data: FileResponseData;
    constructor(data: FileResponseData) {
        this.data = data;
    }
}

export class RedirectResponse {
    url: string;
    status: number;
    constructor(url: string, status: 301 | 302 | 308) {
        this.url = url;
        this.status = status;
    }
}

const supportedRequestTypes = ["GET", "POST", "PATCH", "DELETE"];
export default function apiPageHandler(options: IOptions, callbacks: apiCallback) {
    return async (req: CustomApiRequest, res: NextApiResponse): Promise<void> => {
        const method = req.method?.toUpperCase();
        if (method == null || !supportedRequestTypes.includes(method.toUpperCase())) {
            createError(400, "METHOD_NOT_FOUND", `Method ${method} not found.`);
        }
        method as "GET" | "POST" | "PATCH" | "DELETE";
        try {
            if (req.query["documentation"] != null) {
                return returnJson(res, {
                    description: options?.description,
                    roles: options?.roles,
                    methods: Object.keys(callbacks ?? {}),
                    queryParameters: options?.queryParameters,
                    paths: options?.paths,
                    responses: options?.responses,
                });
            }

            const callback = (callbacks as any)?.[method];
            if (callback == null) {
                createError(400, "METHOD_NOT_FOUND", `Method ${method} not found.`);
            }

            if (options?.queryParameters != null) {
                const missingQueryParameters = [];
                for (const i in options?.queryParameters) {
                    const queryParameter = options?.queryParameters[i];
                    if (queryParameter?.required) {
                        if (req.query[i] === undefined) {
                            missingQueryParameters.push(i);
                        }
                    }
                }

                if (missingQueryParameters.length > 0) {
                    createError(400, "MISSING_QUERY_PARAMETERS", `Query Parameters Missing: ${missingQueryParameters.join(", ")}`);
                }
            }

            const user = await setupUser(req);

            const roles = options?.roles ?? [];

            if (options?.authenticated && user == null) {
                createError(401, "NOT_AUTHORIZED", "You do not have access to this api");
            }
            const canAccess = checkRole(user, roles as any);

            if (!canAccess) {
                createError(401, "NOT_AUTHORIZED", "You do not have access to this api");
            }

            const CustomRequest: CustomRequest = {
                res: res,
                req: req,
                user: user,
                setHeader: (key: string, value: string) => {
                    res.setHeader(key, value);
                },
                getQuery: (key: string, def: string | string[] | undefined = undefined) => {
                    return req?.query?.[key] ?? def;
                },
                getData: () => {
                    // Check if req.body is json.
                    if (req.headers["content-type"]?.includes("application/json")) {
                        return req.body;
                    }
                    return toJson(req.body, null) ?? null;
                },
            };

            res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.setHeader("Access-Control-Allow-Credentials", "true");

            const response = await callback(CustomRequest);
            if (response instanceof CsvResponse) {
                res.status(200)
                    .setHeader("Content-Type", "text/csv")
                    .setHeader("Content-Disposition", `attachment; filename=${response.fileName}`)
                    .send(response.data);
                return;
            }
            if (response instanceof FileResponse) {
                res.status(200).setHeader("Content-Type", response.data.type).send(response.data.payload);
                return;
            }

            if (response instanceof RedirectResponse) {
                res.redirect(response.status, response.url);
                return;
            }

            const responseData = toJson(response, null);
            if (responseData == null) {
                returnStringOrObjectOrBuffer(res, response);
            } else {
                returnJson(res, responseData);
            }
        } catch (e: any) {
            const response = {
                status: e?.status ?? 500,
                code: e?.code ?? "ERROR",
                message: e?.message ?? "Internal Error Occurred",
                data: e?.data ?? null,
            };
            returnJson(res, response?.data ?? response?.message, response?.status);
        }
    };
}
