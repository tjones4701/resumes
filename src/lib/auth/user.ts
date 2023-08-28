import { Claims } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import { UserArgs } from "@prisma/client/runtime/library";
import { Auth0WS } from "@src/lib/webservices/auth0-webservice";

const prisma = new PrismaClient();

export type User = {
    id: string | null;
    roles: UserRole[];
    expiresAt: number;
};

export type UserAuthentication = {
    nickname: string;
    name: string;
    picture: string;
    updated_at: string;
    email: string;
    email_verified: boolean;
    sub: string;
    sid: string;
};

export type UserRole = {
    id: string;
    name: string;
    description: string;
};

export async function getRoles(userId: string): Promise<UserRole[]> {
    const ws = Auth0WS("ROLES");
    try {
        const response = await ws.get({ userId: encodeURI(userId) });

        const data = response?.getData();
        return data ?? [];
    } catch (e) {
        console.error("ERROR", e);
        return [];
    }
}

export async function getOrCreateUser(id: string | undefined) {
    if (id != null) {
        const user = await prisma.users.findFirst({
            where: {
                id: id,
            },
        });
        if (user != null) {
            return user;
        }
    }

    return await prisma.users.create({
        data: {
            data: {},
        },
    });
}

export async function createOrUpdateUserAuthentication(userData: Claims) {
    let userAuthentication = await prisma.usersAuthentications.findFirst({
        where: {
            subscriptionId: userData.sub,
        },
    });

    let user = await getOrCreateUser(userAuthentication?.id);

    if (userAuthentication == null) {
        return await prisma.usersAuthentications.create({
            data: {
                subscriptionId: userData.sub,
                userId: user.id,
                data: {},
            },
        });
    }

    return userAuthentication;
}
