import { Type } from '@sinclair/typebox';
import { FileDto } from '@dtos/out';
import { minioHandler } from '@handlers';
import { createRoutes } from '@utils';

export const uploadFilePlugin = createRoutes('File', [
    {
        method: 'POST',
        url: '/:fname',
        schema: {
            params: { fname: Type.String() },
            response: {
                200: FileDto
            }
        },
        handler: minioHandler.uploadFile
    },
    {
        method: 'GET',
        url: '/:fname/:hostname',
        schema: {
            params: { fname: Type.String(), hostname: Type.String() },
            response: {
                200: Type.String()
            }
        },
        handler: minioHandler.getURLFile
    },
    {
        method: 'GET',
        url: '/metadata',
        schema: {
            response: {
                200: Type.Array(FileDto)
            }
        },
        handler: minioHandler.listMetadataFile
    },
    {
        method: 'DELETE',
        url: '/:fname',
        schema: {
            params: { fname: Type.String() },
            response: {
                200: Type.String()
            }
        },
        handler: minioHandler.deleteFile
    }
]);
