import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
    private readonly logger = new Logger('LoggerInterceptor');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const httpContext = context.switchToHttp();
        const request = httpContext.getRequest<Request>();
        const response = httpContext.getResponse<Response>();

        return next.handle().pipe(
            catchError((err) => {
                response.on('finish', () => {
                    const { method, originalUrl, body: bodyReqSent } = request;
                    const { statusCode, statusMessage } = response;

                    const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`;
                    const responseBody = response.locals.body;

                    this.logger.error(
                        `${message} \n- Request: ${JSON.stringify(bodyReqSent)} \n- Response: ${responseBody}`,
                        err.stack
                    );
                });

                return throwError(() => err);
            })
        );
    }
}
