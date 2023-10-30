import { config as configEnv } from 'dotenv';
import { str, cleanEnv, num } from 'envalid';

configEnv();

export const envs = cleanEnv(process.env, {
    NODE_ENV: str<NodeEnv>({
        devDefault: 'development',
        choices: ['development', 'production', 'staging']
    }),
    JWT_SECRET: str(),
    COOKIE_SECRET: str(),
    CORS_WHITE_LIST: str(),
    MINIO_ACCESS_KEY: str(),
    MINIO_SECRET_KEY: str(),
    MINIO_ENDPOINT: str({ devDefault: 'localhost' }),
    MINIO_PORT: num({ devDefault: 9000 }),
    MINIO_BUCKET_NAME: str()
});

export const CORS_WHITE_LIST = envs.CORS_WHITE_LIST.split(',');
