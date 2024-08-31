import { PrismaService } from '@config/prisma.service';
import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './application/usecases/create-user.usecase';
import { FindOneUserUseCase } from './application/usecases/find-one-user.usecase';
import { LoginUseCase } from './application/usecases/login.usecase';
import { UserRepository } from './domain/repositories/user-repository.interface';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { UserController } from './presentation/controllers/user.controller';

@Module({
    providers: [
        {
            provide: UserRepository,
            useClass: PrismaUserRepository,
        },
        PrismaService,
        CreateUserUseCase,
        FindOneUserUseCase,
        LoginUseCase,
    ],
    controllers: [UserController],
    exports: [FindOneUserUseCase, UserRepository],
})
export class UserModule {}
