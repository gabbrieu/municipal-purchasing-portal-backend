import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IReqUser } from '../../auth/application/dto/auth.dto';

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): IReqUser => {
        const request = ctx.switchToHttp().getRequest();
        return request.user as IReqUser;
    }
);
