import { FastifyInstance } from 'fastify';
import { uploadFilePlugin } from './minio.plugin';

export async function apiPlugin(app: FastifyInstance) {
    app.register(uploadFilePlugin, { prefix: '/file' });
}
