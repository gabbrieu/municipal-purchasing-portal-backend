import { CreateUserDto } from '../../application/dto/create-user.dto';
import { IUser, IUserWithoutPassword } from '../entities/user.entity';

export type UserUniqueFilter = Partial<IUserWithoutPassword>;

export abstract class UserRepository {
    abstract findUnique<T extends boolean | undefined = false>(
        where: UserUniqueFilter,
        withPassword?: T
    ): Promise<
        T extends true ? IUser | undefined : IUserWithoutPassword | undefined
    >;

    abstract create(
        dto: CreateUserDto,
        hashedPassword: string
    ): Promise<IUserWithoutPassword>;
}
