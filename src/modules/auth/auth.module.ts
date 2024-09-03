import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../../config/prisma.service';
import { JwtAuthGuard } from './application/services/auth.guard';
import { JwtStrategy } from './application/services/jwt.strategy';
import { RolesGuard } from './application/services/roles.guard';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '2h' },
        }),
    ],
    providers: [JwtAuthGuard, PrismaService, JwtStrategy, RolesGuard],
})
export class AuthModule {}
