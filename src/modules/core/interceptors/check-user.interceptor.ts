import {
    CallHandler,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ERoles, IReqUser } from '../../auth/application/dto/auth.dto';

@Injectable()
export class CheckUserInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const reqUser: IReqUser = request.user;
        const userIdOnParams: number = Number(request.params.userId);

        if (reqUser.role === ERoles.ADMIN) return next.handle();
        if (reqUser.userId !== userIdOnParams)
            throw new ForbiddenException(
                'You do not have permission to access another user resources'
            );

        return next.handle();
    }
}
