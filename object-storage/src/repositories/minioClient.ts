import { envs } from '@configs';
import { Client as MinIOClient } from 'minio';

export const minioClient = new MinIOClient({
    endPoint: envs.MINIO_ENDPOINT,
    accessKey: envs.MINIO_ACCESS_KEY,
    secretKey: envs.MINIO_SECRET_KEY,
    port: envs.MINIO_PORT,
    useSSL: false
});