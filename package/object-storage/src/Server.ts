import fastify, { FastifyInstance } from 'fastify';
import { CORS_WHITE_LIST, customErrorHandler, envs, loggerConfig, swaggerConfig, swaggerUIConfig } from '@configs';
import { apiPlugin } from './routes';

export function createServer(config: ServerConfig): FastifyInstance {
    const app = fastify({ logger: loggerConfig[envs.NODE_ENV] });

    app.register(import('@fastify/sensible'));
    app.register(import('@fastify/helmet'));
    app.register(import('@fastify/cors'), {
        origin: CORS_WHITE_LIST
    });

    // Swagger on production will be turned off in the future
    if (envs.isDev) {
        app.register(import('@fastify/swagger'), swaggerConfig);
        app.register(import('@fastify/swagger-ui'), swaggerUIConfig);
    }

    app.register(apiPlugin, { prefix: '/api' });

    app.setErrorHandler(customErrorHandler);

    const shutdown = async () => {
        await app.close();
    };

    const start = async () => {
        await app.listen({
            host: config.host,
            port: config.port
        });
        await app.ready();
        if (!envs.isProd) {
            app.swagger({ yaml: true });
            app.log.info(`Swagger documentation is on http://${config.host}:${config.port}/docs`);
        }
    };

    return {
        ...app,
        start,
        shutdown
    };
}
