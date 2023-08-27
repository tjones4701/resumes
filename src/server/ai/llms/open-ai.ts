import { forceArray } from "@src/utilities/force-array";
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from "openai-edge";

const AUD = 1.49;
const pricing = {
    "gpt-3.5-turbo-16k": {
        input: 0.003 / 1000,
        output: 0.004 / 1000,
    },
    "gpt-3.5-turbo": {
        input: 0.0015 / 1000,
        output: 0.002 / 1000,
    },
    "gpt-4": {
        input: 0.03 / 1000,
        output: 0.06 / 1000,
    },
};

export type OpenAIApiResponse = {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: any[];
    usage: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
    price: number;
    content: string;
} | null;

const generatePricing = (response: OpenAIApiResponse, model: Models) => {
    if (response?.usage == null) {
        return 0;
    }
    const inputPrice = pricing[model].input;
    const outputPrice = pricing[model].output;
    return response.usage.prompt_tokens * inputPrice + response.usage.completion_tokens * outputPrice * AUD;
};

export type Models = "gpt-3.5-turbo-16k" | "gpt-3.5-turbo" | "gpt-4";
export type ChatCompletionMessage = {
    content: string | string[];
    role: ChatCompletionRequestMessageRoleEnum;
};
export async function createChatCompletion(
    messages: ChatCompletionMessage[] | ChatCompletionMessage,
    model: Models | undefined = undefined
): Promise<OpenAIApiResponse | null> {
    let totalPromptLength = 0;
    const completionMessages = forceArray(messages).map((item) => {
        const message: ChatCompletionRequestMessage = {
            role: item.role,
            content: forceArray(item.content).join("\n"),
        };
        totalPromptLength = totalPromptLength + (message.content?.length ?? 0);
        return message;
    });

    if (model == undefined) {
        const tokens = totalPromptLength / 4;
        if (tokens > 4000) {
            model = "gpt-3.5-turbo-16k";
        } else {
            model = "gpt-3.5-turbo";
        }
    }
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    try {
        const completion = await openai.createChatCompletion({
            model: model,
            messages: completionMessages,
        });

        const response = await completion.json();
        response.content = response.choices?.[0]?.message?.content ?? "";
        response.price = generatePricing(response, model);
        return response;
    } catch (error) {
        console.log(error);
        return null;
    }
}
