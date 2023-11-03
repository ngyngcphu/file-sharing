import { config as configEnv } from 'dotenv';
import { str, cleanEnv, num } from 'envalid';

configEnv();

export const envs = cleanEnv(process.env, {
    NODE_ENV: str<NodeEnv>({
        devDefault: 'development',
        choices: ['development', 'production']
    }),
    MINIO_ACCESS_KEY: str(),
    MINIO_SECRET_KEY: str(),
    MINIO_ENDPOINT: str({ devDefault: 'localhost' }),
    MINIO_PORT: num({ devDefault: 9000 }),
    MINIO_BUCKET_NAME: str()
});
