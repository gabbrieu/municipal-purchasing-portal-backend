import { PrismaService } from '@config/prisma.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './application/services/auth.guard';
import { JwtCookieStrategy } from './application/services/jwt-cookie.strategy';
import { RolesGuard } from './application/services/roles.guard';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1d' },
        }),
    ],
    providers: [JwtAuthGuard, PrismaService, JwtCookieStrategy, RolesGuard],
})
export class AuthModule {}
