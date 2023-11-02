import { Type } from '@sinclair/typebox';
import { minioHandler } from '@handlers';
import { createRoutes } from '@utils';

export const uploadFilePlugin = createRoutes('File', [
    {
        method: 'POST',
        url: '/:fname',
        schema: {
            params: { fname: Type.String() } ,
            response: {
                200: Type.String()
            }
        },
        handler: minioHandler.uploadFile
    }
]);
