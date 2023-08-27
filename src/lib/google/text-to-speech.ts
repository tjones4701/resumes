import { getConfigValue } from "@src/utilities/config";
import textToSpeech from "@google-cloud/text-to-speech";

export async function generateTextToSpeech(text: string) {
    const client = new textToSpeech.TextToSpeechClient({
        credentials: {
            private_key: getConfigValue("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY")
                .split(String.raw`\n`)
                .join("\n"),
            client_id: getConfigValue("GOOGLE_SERVICE_ACCOUNT_CLIENT_ID"),
            client_email: getConfigValue("GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL"),
        },
    });

    // Construct the request
    const request: any = {
        input: { text: text },
        // Select the language and SSML voice gender (optional)
        voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
        // select the type of audio encoding
        audioConfig: { audioEncoding: "MP3" },
    };
    try {
        // Performs the text-to-speech request
        const [response] = await client.synthesizeSpeech(request);

        return response;
    } catch (e) {
        console.log("ERROR", e);
        return null;
    }
}
