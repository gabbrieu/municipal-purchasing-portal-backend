import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from './roles.decorator';
import { ERoles } from './roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const role: ERoles = this.reflector.getAllAndOverride(Roles, [
            context.getHandler(),
            context.getClass(),
        ]);
    }
}
