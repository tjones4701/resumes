import { ChatCompletionMessage, createChatCompletion } from "@src/server/ai/llms/open-ai";
import apiPageHandler from "@src/utilities/api-handler";
import { cleanString } from "@src/utilities/clean-string";

export default apiPageHandler(
    {
        description: "",
        roles: ["PUBLIC"],
        authenticated: true,
    },
    {
        POST: async (request) => {
            const exampleFormat = {
                skills: [{ category: "", name: "", level: "High, Medium, Low" }],
            };
            const data = cleanString(request.getData()?.job_summary ?? "");

            const messages: ChatCompletionMessage[] = [
                {
                    role: "system",
                    content: [
                        `You will be provided with content from a job application. You will need to create a list of skills the user is required to have for the role. You must provide the skills in the following format:`,
                        JSON.stringify(exampleFormat),
                    ],
                },
                {
                    role: "user",
                    content: data,
                },
            ];
            const skills = await createChatCompletion(messages);
            try {
                JSON.parse(skills?.content ?? "");
            } catch (e) {
                console.error(e);
            }
            return {
                skills: JSON.parse(skills?.content ?? ""),
                raw: skills,
            };
        },
    }
);
