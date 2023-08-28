import { ResumeWS } from "@src/lib/webservices/app-webservice";

export type JobHistory = {
    organisation?: string;
    position_title?: string;
    summary?: string;
    start_date?: string;
    end_date?: string;
};

export type ProfileSkills = {
    category: string;
    name: string;
    level: "High" | "Medium" | "Low";
};

export type Profile = {
    email?: string;
    name?: string;
    current_title?: string;
    summary?: string;
    contact_number?: string;
    links: {
        name: string;
        url: string;
    }[];
    job_history: {};
    skills: ProfileSkills[];
};

export async function getProfiles() {
    const ws = ResumeWS("PROFILES");
    const response = await ws.get();

    return response;
}
