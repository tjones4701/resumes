import { getConfigValue } from "@src/utilities/config";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
// Set the AWS Region.
const REGION = "us-east-1"; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
    credentials: {
        accessKeyId: getConfigValue("AWS_ACCESS_KEY_VALUE"),
        secretAccessKey: getConfigValue("AWS_ACCESS_SECRET"),
    },
    region: REGION,
});

const bucketName = "ai-prototypes";

export async function uploadImage(fileName: string, contentType: string, arrayBuffer: Buffer) {
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: arrayBuffer,
        contentType: contentType,
    };

    const results = await s3Client.send(new PutObjectCommand(params));
    return results;
}
