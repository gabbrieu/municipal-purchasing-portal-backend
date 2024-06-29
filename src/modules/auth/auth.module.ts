import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../../config/prisma.service';
import { FindOneUserUseCase } from '../user/usecases/find-one-user.usecase';
import { JwtAuthGuard } from './services/auth.guard';
import { JwtStrategy } from './services/jwt.strategy';
import { RolesGuard } from './services/roles.guard';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '2h' },
        }),
    ],
    providers: [
        JwtAuthGuard,
        PrismaService,
        JwtStrategy,
        FindOneUserUseCase,
        RolesGuard,
    ],
})
export class AuthModule {}
