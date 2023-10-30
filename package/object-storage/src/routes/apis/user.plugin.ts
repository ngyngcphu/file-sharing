import { UserDto } from '@dtos/out';
import { createRoutes } from '@utils';

export const userPlugin = createRoutes('User', [
    {
        method: 'GET',
        url: '',
        schema: {
            response: {
                200: UserDto
            }
        },
        handler: () => null
    }
]);
