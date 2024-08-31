import { Injectable } from '@nestjs/common';
import { ErrorHandler } from '@utils/error-handler.utils';
import { HashUtils } from '@utils/hash.utils';
import { IUserWithoutPassword } from '../../domain/entities/user.entity';
import { UserRepository } from '../../domain/repositories/user-repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(dto: CreateUserDto): Promise<IUserWithoutPassword> {
        try {
            const hashedPassword: string = await HashUtils.hashPassword(
                dto.password
            );

            return await this.userRepository.create(dto, hashedPassword);
        } catch (error) {
            ErrorHandler.handle(error);
        }
    }
}
