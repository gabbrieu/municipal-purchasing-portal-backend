import { Module } from '@nestjs/common';
import { PrismaService } from '../../config/prisma.service';
import { UserController } from './controller/user.controller';
import { CreateUserUseCase } from './usecases/create-user.usecase';

@Module({
    controllers: [UserController],
    providers: [CreateUserUseCase, PrismaService],
})
export class UserModule {}
