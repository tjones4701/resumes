import { JobHistory, Profile, ProfileSkills } from "@src/client/app-data/profiles";
import { ChatCompletionMessage, createChatCompletion } from "@src/server/ai/llms/open-ai";
import apiPageHandler from "@src/utilities/api-handler";
import { cleanString } from "@src/utilities/clean-string";
import toJson from "@src/utilities/to-json";

async function getSkillsFromUserSummary(summary: string) {
    const exampleFormat = {
        skills: [{ category: "", name: "", level: "High, Medium, Low" }],
    };
    const data = cleanString(summary);

    const messages: ChatCompletionMessage[] = [
        {
            role: "system",
            content: [
                `You will be provided with content from a user. You will need to create a list of skills the user might have.`,
                `Where you do not know a value, please just have an empty string.`,
                `You must provide the skills in the following format:`,
                JSON.stringify(exampleFormat),
            ],
        },
        {
            role: "user",
            content: data,
        },
    ];
    const skills = await createChatCompletion(messages);

    return toJson<{ skills: ProfileSkills[] }>(skills?.content ?? "", { skills: [] })?.skills ?? [];
}

async function getJobHistoryFromUserSummary(summary: string) {
    const exampleFormat = {
        job_history: [{ organisation: "", start_date: "", end_date: "", position_title: "", summary: "" }],
    };
    const data = cleanString(summary);

    console.log(data);

    const messages: ChatCompletionMessage[] = [
        {
            role: "system",
            content: [
                `You will be provided with content from a user. Using this content, you need to extract out the job/work experience.`,
                `Where you do not know a value, please just have an empty string.`,
                `You must provide it in the following format:`,
                JSON.stringify(exampleFormat),
            ],
        },
        {
            role: "user",
            content: data,
        },
    ];

    console.log(messages);
    const chatCompletion = await createChatCompletion(messages);
    return toJson<{ job_history: JobHistory[] }>(chatCompletion?.content ?? "", { job_history: [] })?.job_history ?? [];
}

async function getProfileDetailsFromUserSummary(summary: string) {
    const exampleFormat = {
        user_name: "",
        email: "",
        contact_number: "",
    };
    const data = cleanString(summary);

    const messages: ChatCompletionMessage[] = [
        {
            role: "system",
            content: [
                `You will be provided with content from a user. You will need to extract out information from the user.`,
                `Where you do not know a value, please just have an empty string.`,
                `You must provide it in the following format:`,
                JSON.stringify(exampleFormat),
            ],
        },
        {
            role: "user",
            content: data,
        },
    ];
    const chatCompletion = await createChatCompletion(messages);
    return toJson<{ user_name: string; email: string; contact_number: string }>(chatCompletion?.content, {
        user_name: "",
        email: "",
        contact_number: "",
    });
}

async function getProfileFromUserSummary(summary: string): Promise<Profile> {
    const promises = [getProfileDetailsFromUserSummary(summary), getJobHistoryFromUserSummary(summary), getSkillsFromUserSummary(summary)] as const;

    const [profileDetails, jobHistory, skills] = await Promise.all(promises);

    const profile: Profile = {
        name: profileDetails?.user_name ?? "",
        email: profileDetails?.email ?? "",
        contact_number: profileDetails?.contact_number ?? "",
        links: [],
        job_history: jobHistory,
        skills: skills,
    };

    return profile;
}
export default apiPageHandler(
    {
        description: "",
        roles: ["PUBLIC"],
        authenticated: true,
    },
    {
        POST: async (request) => {
            const data = request.getData()?.user_summary ?? "";
            return await getProfileFromUserSummary(data);
        },
    }
);
