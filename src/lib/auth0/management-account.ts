import axios from "axios";
export async function getManagementRequest(): Promise<string> {
    const body = {
        "audience": "https://digital-ethos.au.auth0.com/api/v2/",
        "grant_type": "client_credentials",
        "client_id": process.env.AUTH0_MANAGEMENT_CLIENT_ID,
        "client_secret": process.env.AUTH0_MANAGEMENT_CLIENT_SECRET
    }

    const tokenReponse = await axios.post("https://digital-ethos.au.auth0.com/oauth/token", body);
    return tokenReponse?.data?.access_token ?? "";
}