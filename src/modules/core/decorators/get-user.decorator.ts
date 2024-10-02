import { IReqUser } from '@modules/auth/application/dto/auth.dto';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): IReqUser => {
        const request = ctx.switchToHttp().getRequest();
        return request.user as IReqUser;
    }
);
