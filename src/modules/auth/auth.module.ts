import { PrismaService } from '@config/prisma.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { JwtAuthGuard } from './application/services/auth.guard';
import { JwtCookieStrategy } from './application/services/jwt-cookie.strategy';
import { RolesGuard } from './application/services/roles.guard';
import { LoginUseCase } from './application/usecases/login.usecase';
import { RefreshTokenUseCase } from './application/usecases/refresh-token.usecase';
import { AuthController } from './presentation/controllers/auth.controller';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
        }),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [
        JwtAuthGuard,
        PrismaService,
        JwtCookieStrategy,
        // JwtStrategy,
        RolesGuard,
        LoginUseCase,
        RefreshTokenUseCase,
    ],
})
export class AuthModule {}
