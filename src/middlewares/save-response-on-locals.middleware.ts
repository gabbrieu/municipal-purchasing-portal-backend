import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class SaveResponseOnLocalsMiddleware implements NestMiddleware {
    use(_: Request, res: Response, next: NextFunction) {
        const originalSend = res.send;

        res.send = function (...args: any[]) {
            res.locals.body = args[0];
            return originalSend.apply(res, args);
        };

        next();
    }
}
