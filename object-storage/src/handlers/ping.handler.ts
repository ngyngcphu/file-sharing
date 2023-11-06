import { envs } from "@configs";
import { Handler } from "@interfaces";
import { minioClient } from "@repositories";

const pingHostName: Handler<string> = async (_req, _res) => {
    const bucketExists = await minioClient.bucketExists(envs.MINIO_BUCKET_NAME);
    if (!bucketExists) {
        throw new Error("Bucket doesn't exist");
    }
    return 'Alive !';
};

export const pingHandler = { pingHostName }