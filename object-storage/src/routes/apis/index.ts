import { FastifyInstance } from 'fastify';
import { uploadFilePlugin } from './minio.plugin';
import { pingPlugin } from './ping.plugin';

export async function apiPlugin(app: FastifyInstance) {
    app.register(uploadFilePlugin, { prefix: '/file' });
    app.register(pingPlugin, { prefix: '/ping' });
}
