import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
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

    app.use(new SaveResponseOnLocalsMiddleware().use);
    app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
    app.useGlobalInterceptors(new LoggerInterceptor());
    app.enableCors();

    await app.listen(3000);
}

function setupLogger(): winston.Logger {
    const logger = createLogger({
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
            }),
        ],
    });

    if (process.env.NODE_ENV === 'prod') {
        const cloudwatchConfig: WinstonCloudWatch.CloudwatchTransportOptions = {
            logGroupName: process.env.CLOUDWATCH_GROUP_NAME,
            logStreamName: `${process.env.CLOUDWATCH_GROUP_NAME}-${process.env.NODE_ENV}`,
            awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
            awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
            awsRegion: process.env.AWS_REGION,
            jsonMessage: true,
        };
        logger.add(new WinstonCloudWatch(cloudwatchConfig));
    }

    return logger;
}

bootstrap();
