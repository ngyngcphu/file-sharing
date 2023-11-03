import type { MultipartFile } from '@fastify/multipart';
import { envs } from '@configs';
import { Handler } from "@interfaces";
import { logger, minio, validateMultipartFile } from "@utils";

const uploadFile: Handler<
    string, { Params: { fname: string }; consumes: ['multipart/form-data']; Body: { file: MultipartFile } }
> = async (req, res) => {
    const data = req.body.file;
    const fname = req.params.fname;
    if (!data) {
        return res.badRequest('Missing the file');
    }
    const validationResult = await validateMultipartFile(data);
    if (validationResult && validationResult.error) {
        return res.badRequest(validationResult.error);
    }
    const buffer = await data.toBuffer();
    const message = await minio.uploadFileToLocalRepo(fname, buffer);
    logger.info(message);
    return res.status(200).send(message);
}

const getURLFile: Handler<string, { Params: { fname: string } }> = async (req, res) => {
    const fname = req.params.fname;
    const objectStat = await minio.statObjectOfLocalRepo(fname);
    if (!objectStat) {
        return res.badRequest('File does not exist in local repository !');
    }

    try {
        const fileURL = `${req.ip}:${envs.MINIO_PORT}/${envs.MINIO_BUCKET_NAME}/${fname}`;
        return res.status(200).send(fileURL);
    } catch (err) {
        logger.error(err);
        return res.status(500).send(err.message);
    }
}

export const minioHandler = {
    uploadFile,
    getURLFile
};
