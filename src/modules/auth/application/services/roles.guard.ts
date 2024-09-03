import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { ERoles, IReqUser } from '../dto/auth.dto';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<ERoles>(Roles, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const user: IReqUser = context.switchToHttp().getRequest().user;

        if (!user) {
            throw new ForbiddenException('User not exist');
        }

        if (!user.role) {
            throw new ForbiddenException(
                'User does not have a role associated with'
            );
        }

        if (requiredRoles === ERoles.ADMIN && user.role !== ERoles.ADMIN) {
            throw new ForbiddenException(
                'User does not have permission to access this endpoint'
            );
        }

        return true;
    }
}
