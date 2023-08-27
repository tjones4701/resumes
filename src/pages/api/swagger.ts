import path from "path";
import fs from "fs";
import apiPageHandler from "@src/utilities/api-handler";
const baseDir = __dirname;
const baseApiPath = path.resolve(baseDir, "../../../../src/pages/api");

function getApiFiles(dir: string): string[] {
    let files: string[] = [];

    fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        console.log(filePath);
        if (stat.isDirectory()) {
            files = files.concat(getApiFiles(filePath));
        } else if (path.extname(filePath) === ".ts") {
            files.push(filePath.substring(baseApiPath.length + 1));
        }
    });

    return files;
}
function loadDefinitionFromFile(path: string) {}

function loadApiDefinitions() {
    const files = getApiFiles(baseApiPath);
    const definitions = [];
    for (var i in files) {
        try {
            const filePath = path.resolve(baseApiPath, files[i]);
            const definition = require(filePath);
            console.log(definition);
        } catch (e) {
            console.warn(e);
        }
    }
    return files;
}

const loadApiDocs = () => {};

const baseSwaggerDocs = {
    swagger: "2.0",
    info: {
        title: "Profile API",
        version: "1.0.0",
    },
    basePath: "/api",
    schemes: ["https"],
    securityDefinitions: {
        Bearer: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
        },
    },
    security: [
        {
            Bearer: [],
        },
    ],
    paths: {
        "/profiles": {
            get: {
                summary: "Get a list of profiles for the authenticated user",
                produces: ["application/json"],
                responses: {
                    "200": {
                        description: "A list of profiles for the authenticated user",
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/definitions/Profile",
                            },
                        },
                    },
                    "401": {
                        description: "Unauthorized",
                    },
                },
            },
        },
    },
    definitions: {
        Profile: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                },
                name: {
                    type: "string",
                },
                email: {
                    type: "string",
                },
            },
        },
    },
};

export default apiPageHandler(
    {
        description: "",
        roles: ["PUBLIC"],
    },
    {
        GET: async (request) => {
            return {
                files: loadApiDefinitions(),
                test: baseApiPath,
            };
        },
    }
);
