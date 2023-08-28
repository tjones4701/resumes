import { User } from "@src/lib/auth/user";
import { getRoles } from "@src/lib/auth0/roles";
import { getConfigValue } from "@src/utilities/config";
import jwt from "jsonwebtoken";

export async function initialiseUser(id: string, expiresAt: number) {
    const userObject: User = {
        id: null,
        roles: [],
        expiresAt: expiresAt,
    };

    const roles = await getRoles(id);
    userObject.id = id;
    userObject.roles = roles ?? [];

    return userObject;
}

export async function generateUserJwt(id: string, expiresAt: number) {
    const user = await initialiseUser(id, expiresAt);
    const now = Math.round(Date.now() / 1000);
    const duration = expiresAt - now;
    const token = jwt.sign(user, getConfigValue("AUTH_JWT_SECRET"), { expiresIn: duration });
    return token;
}
