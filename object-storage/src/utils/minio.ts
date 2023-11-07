import { BucketItem, BucketItemStat } from 'minio';
import { envs } from '@configs';
import { minioClient } from '@repositories';

const uploadFileToLocalRepo = async (fileName: string, fileBuffer: Buffer) => {
    const bucketExists = await minioClient.bucketExists(envs.MINIO_BUCKET_NAME);
    if (!bucketExists) {
        throw new Error("Bucket doesn't exist");
    }
    try {
        const object = await minioClient.putObject(envs.MINIO_BUCKET_NAME, fileName, fileBuffer);
        if (object) {
            const statFile = await minioClient.statObject(envs.MINIO_BUCKET_NAME, fileName);
            return {
                name: fileName,
                type: fileName.split('.').pop()?.toLowerCase(),
                size: statFile.size
            }
        }
    } catch (error) {
        throw new Error(`Error upload file to Local Repository: ${error.message}`);
    }
};

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

const listObjects = async (): Promise<BucketItem[]> => {
    return new Promise<BucketItem[]>((resolve, reject) => {
        const objectsStream = minioClient.listObjects(envs.MINIO_BUCKET_NAME, '', true);
        const objects: BucketItem[] = [];

        objectsStream.on('data', obj => objects.push(obj));
        objectsStream.on('error', error => reject(error));
        objectsStream.on('end', () => resolve(objects));
    });
};

const listObjectMetadata = async () => {
    try {
        const objects = await listObjects();
        const metadataList = [];
        for (const object of objects) {
            if (object.name) {
                metadataList.push({ name: object.name, size: object.size });
            }
        }
        return metadataList;
    } catch (error) {
        throw new Error(`Can not list objects in local repository: ${error.message}`);
    }
};

const removeFileFromMinio = async (fileName: string) => {
    const bucketExists = await minioClient.bucketExists(envs.MINIO_BUCKET_NAME);
    if (!bucketExists) {
        throw new Error("Bucket doesn't exist");
    }

    try {
        await minioClient.removeObject(envs.MINIO_BUCKET_NAME, fileName);
    } catch (error) {
        throw new Error(`Error removing file from Minio: ${error.message}`);
    }
};

export const minio = { 
    uploadFileToLocalRepo, 
    statObjectOfLocalRepo, 
    listObjectMetadata,
    removeFileFromMinio
};