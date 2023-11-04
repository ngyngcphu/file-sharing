import { BucketItemStat } from 'minio';
import { minioClient } from '@repositories';
import { envs } from '@configs';

const uploadFileToLocalRepo = async (fileName: string, fileBuffer: Buffer) => {
    const bucketExists = await minioClient.bucketExists(envs.MINIO_BUCKET_NAME);
    if (!bucketExists) {
        throw new Error("Bucket doesn't exist");
    }
    try {
        await minioClient.putObject(envs.MINIO_BUCKET_NAME, fileName, fileBuffer);
        const statFile = await minioClient.statObject(envs.MINIO_BUCKET_NAME, fileName);
        return {
            name: fileName,
            type: fileName.split('.').pop()?.toLowerCase(),
            size: statFile.size
        }
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

// const getFileFromLocalRepo = async (fileName: string): Promise<Buffer> => {
//     const bucketExists = await minioClient.bucketExists(envs.MINIO_BUCKET_NAME);
//     if (!bucketExists) {
//         throw new Error("Bucket doesn't exist");
//     }

//     try {
//         const dataStream = await minioClient.getObject(envs.MINIO_BUCKET_NAME, fileName);
//         const chunks: Buffer[] = [];

//         return new Promise<Buffer>((resolve, reject) => {
//             dataStream.on('data', (chunk) => {
//                 chunks.push(chunk);
//             });

//             dataStream.on('end', () => {
//                 const fileBuffer = Buffer.concat(chunks);
//                 resolve(fileBuffer);
//             });

//             dataStream.on('error', (error) => {
//                 reject(error);
//             });
//         });
//     } catch (error) {
//         throw new Error(`Error fetching file from Local Repository: ${error.message}`);
//     }
// };

const statObjectOfLocalRepo = async (fileName: string): Promise<BucketItemStat> => {
    const bucketExists = await minioClient.bucketExists(envs.MINIO_BUCKET_NAME);
    if (!bucketExists) {
        throw new Error("Bucket doesn't exist");
    }
    try {
        const stat = await minioClient.statObject(envs.MINIO_BUCKET_NAME, fileName);
        return stat;
    } catch (error) {
        throw new Error(`Does not exist object in bucket: ${error.message}`);
    }
}

const createPresignedGetFile = async (fileName: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        minioClient.presignedGetObject(envs.MINIO_BUCKET_NAME, fileName, 24 * 60 * 60, (err, presignedUrl) => {
            if (err) {
                reject(new Error(`Cannot create presigned URL: ${err.message}`));
            } else {
                resolve(presignedUrl);
            }
        });
    });
}

// const isObjectExistInMinio = async (bucketName: string, objectName: string) => {
//     try {
//         await minioClient.statObject(bucketName, objectName);
//         return true;
//     } catch (error) {
//         console.error(error);
//         return false;
//     }
// };

export const minio = { createPresignedGetFile, uploadFileToLocalRepo, statObjectOfLocalRepo };