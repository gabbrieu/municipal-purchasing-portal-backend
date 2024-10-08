import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import {
    WinstonModule,
    utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winston from 'winston';
import { createLogger } from 'winston';
import * as WinstonCloudWatch from 'winston-cloudwatch';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { SaveResponseOnLocalsMiddleware } from './middlewares/save-response-on-locals.middleware';

async function bootstrap(): Promise<void> {
    const instance = setupLogger();
    const app = await NestFactory.create(AppModule, {
        logger: WinstonModule.createLogger({
            instance,
        }),
    });

    app.enableCors({
        origin: ['http://localhost:3001'],
        credentials: true,
    });
    app.use(new SaveResponseOnLocalsMiddleware().use);
    app.use(cookieParser());

    app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
    app.useGlobalInterceptors(new LoggerInterceptor());

    await app.listen(3000);
}

function setupLogger(): winston.Logger {
    const isProd = process.env.NODE_ENV === 'prod';

    const logger: winston.Logger = createLogger({
        level: isProd ? 'error' : 'info',
        format: winston.format.json(),
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.ms(),
                    nestWinstonModuleUtilities.format.nestLike('API', {
                        colors: true,
                        prettyPrint: true,
                        processId: true,
                    })
                ),
                level: isProd ? 'error' : 'info',
            }),
        ],
    });

    if (isProd) {
        const cloudwatchConfig: WinstonCloudWatch.CloudwatchTransportOptions = {
            logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
            logStreamName: `${process.env.CLOUDWATCH_GROUP_NAME}-${process.env.NODE_ENV}`,
            awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
            awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
            awsRegion: process.env.AWS_REGION,
            jsonMessage: true,
            level: 'error',
        };
        logger.add(new WinstonCloudWatch(cloudwatchConfig));
    }

    return logger;
}

bootstrap();
