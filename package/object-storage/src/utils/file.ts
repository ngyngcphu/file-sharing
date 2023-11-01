import type { MultipartFile } from '@fastify/multipart';
import {
    EXCEED_FILE_SIZE_LIMIT,
    FILE_EXTENSION_EXCLUDE,
    MAX_FILE_SIZE,
    NOT_ACCEPT_VIDEO,
    VALIDATE_FILE_ERROR
} from '@constants';

export const validateMultipartFile = async (file: MultipartFile) => {
    try {
        const fileExtension = file.fieldname.split('.').pop()?.toLowerCase();
        if (!fileExtension || FILE_EXTENSION_EXCLUDE.includes(`.${fileExtension}`)) {
            return { error: NOT_ACCEPT_VIDEO };
        }
        const fileBuffer = await file.toBuffer();
        if (fileBuffer.length > MAX_FILE_SIZE) {
            return { error: EXCEED_FILE_SIZE_LIMIT }
        }
        return null;
    } catch (err) {
        return { error: VALIDATE_FILE_ERROR}
    }
}