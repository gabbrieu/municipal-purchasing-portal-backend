import { PrismaService } from '@config/prisma.service';
import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { FindOneUserUseCase } from './usecases/find-one-user.usecase';
import { LoginUseCase } from './usecases/login.usecase';

@Module({
    controllers: [UserController],
    providers: [
        PrismaService,
        CreateUserUseCase,
        FindOneUserUseCase,
        LoginUseCase,
    ],
})
export class UserModule {}
