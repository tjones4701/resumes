import { Auth0WS } from "@src/lib/webservices/auth0-webservice";
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
