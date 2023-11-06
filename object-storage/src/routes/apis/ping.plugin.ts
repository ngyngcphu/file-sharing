import { Type } from '@sinclair/typebox';
import { pingHandler } from '@handlers';
import { createRoutes } from '@utils';

export const pingPlugin = createRoutes('Ping', [
    {
        method: 'GET',
        url: '',
        schema: {
            response: {
                200: Type.String()
            }
        },
        handler: pingHandler.pingHostName
    }
]);
