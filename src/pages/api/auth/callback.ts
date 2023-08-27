import { generateUserJwt } from "@src/lib/auth/initialise-user";
import { AfterCallback, handleCallback } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";

const afterCallback: AfterCallback = async (req, res, session, _state) => {
    if (session?.user != null) {
        const userData = await generateUserJwt(session?.user?.sub, session?.accessTokenExpiresAt ?? 0);
        setCookie("ai-prototype-user", userData, { req: req, res: res });
    }
    return session;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    handleCallback(req, res, {
        afterCallback: afterCallback,
    });
}
