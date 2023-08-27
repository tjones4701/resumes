import { ResumeWS } from "@src/lib/webservices/app-webservice";

export type JobHistory = {
    organisation?: string;
    position_title?: string;
    summary?: string;
    start_date?: string;
    end_date?: string;
};

export type Profile = {
    name?: string;
    current_title?: string;
    summary?: string;
    contact_number?: string;
    links: {
        name: string;
        url: string;
    }[];
    job_history: {};
};
export async function getProfiles() {
    const ws = ResumeWS("PROFILES");
    const response = await ws.get();

    return response;
}
