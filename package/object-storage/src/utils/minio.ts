import { minioClient } from '@repositories';
import { envs } from '@configs';

const uploadFileToLocalRepo = async (fileName: string, fileBuffer: Buffer) => {
    const bucketExists = await minioClient.bucketExists(envs.MINIO_BUCKET_NAME);
    if (!bucketExists) {
        throw new Error("Bucket doesn't exist");
    }
    try {
        await minioClient.putObject(envs.MINIO_BUCKET_NAME, fileName, fileBuffer);
    } catch (error) {
        throw new Error(`Error upload file to Local Repository: ${error.message}`);
    }
};

// const removeFileFromMinio = async (objectName: string) => {
//     const bucketExists = await minioClient.bucketExists(envs.MINIO_BUCKET_NAME);

//     if (!bucketExists) {
//         throw new Error("Bucket doesn't exist");
//     }

//     try {
//         await minioClient.removeObject(envs.MINIO_BUCKET_NAME, objectName);
//     } catch (error) {
//         throw new Error(`Error removing file from Minio: ${error.message}`);
//     }
// };

const getFileFromLocalRepo = async (fileName: string): Promise<Buffer> => {
    const bucketExists = await minioClient.bucketExists(envs.MINIO_BUCKET_NAME);
    if (!bucketExists) {
        throw new Error("Bucket doesn't exist");
    }

    try {
        const dataStream = await minioClient.getObject(envs.MINIO_BUCKET_NAME, fileName);
        const chunks: Buffer[] = [];

        return new Promise<Buffer>((resolve, reject) => {
            dataStream.on('data', (chunk) => {
                chunks.push(chunk);
            });

            dataStream.on('end', () => {
                const fileBuffer = Buffer.concat(chunks);
                resolve(fileBuffer);
            });

            dataStream.on('error', (error) => {
                reject(error);
            });
        });
    } catch (error) {
        throw new Error(`Error fetching file from Local Repository: ${error.message}`);
    }
};

// const isObjectExistInMinio = async (bucketName: string, objectName: string) => {
//     try {
//         await minioClient.statObject(bucketName, objectName);
//         return true;
//     } catch (error) {
//         console.error(error);
//         return false;
//     }
// };

export const minio = { uploadFileToLocalRepo, getFileFromLocalRepo };