import type { MultipartFile } from '@fastify/multipart';
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

export const minioHandler = {
    uploadFile
};
