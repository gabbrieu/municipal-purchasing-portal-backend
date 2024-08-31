import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorHandler } from '@utils/error-handler.utils';
import { IUser, IUserWithoutPassword } from '../../domain/entities/user.entity';
import {
    UserRepository,
    UserUniqueFilter,
} from '../../domain/repositories/user-repository.interface';

@Injectable()
export class FindOneUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(
        where: UserUniqueFilter,
        withPassword?: false
    ): Promise<IUserWithoutPassword>;
    async execute(where: UserUniqueFilter, withPassword?: true): Promise<IUser>;
    async execute(
        where: UserUniqueFilter,
        withPassword: boolean = false
    ): Promise<IUser | IUserWithoutPassword> {
        try {
            const user = await this.userRepository.findUnique(
                where,
                withPassword
            );

            if (!user) {
                throw new NotFoundException('User not found');
            }

            return user;
        } catch (error) {
            ErrorHandler.handle(error);
        }
    }
}
