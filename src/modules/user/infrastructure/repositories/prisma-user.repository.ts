import { PrismaService } from '@config/prisma.service';
import { ERoles } from '@modules/auth/types';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import {
    EEducationLevel,
    EGender,
    ERace,
    IUser,
    IUserWithoutPassword,
} from '../../domain/entities/user.entity';
import {
    UserRepository,
    UserUniqueFilter,
} from '../../domain/repositories/user-repository.interface';

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findUnique<T extends boolean | undefined = false>(
        where: UserUniqueFilter,
        withPassword?: T
    ): Promise<
        T extends true ? IUser | undefined : IUserWithoutPassword | undefined
    > {
        const user = await this.prismaService.user.findUnique({
            where: where as Prisma.UserWhereUniqueInput,
        });

        if (!user)
            return undefined as T extends true
                ? IUser | undefined
                : IUserWithoutPassword | undefined;

        return this.mapToDomain(user, withPassword);
    }

    async create(
        dto: CreateUserDto,
        hashedPassword: string
    ): Promise<IUserWithoutPassword> {
        const user: User = await this.prismaService.user.create({
            data: {
                ...dto,
                password: hashedPassword,
                birthDate: new Date(dto.birthDate).toISOString(),
            },
        });

        return this.mapToDomain(user, false);
    }

    private mapToDomain<T extends boolean | undefined = false>(
        user: User,
        withPassword?: T
    ): T extends true ? IUser | undefined : IUserWithoutPassword {
        const userBase: IUserWithoutPassword = {
            id: user.id,
            address: user.address,
            addressNumber: user.addressNumber,
            birthDate: user.birthDate,
            cellphone: user.cellphone,
            city: user.city,
            complement: user.complement,
            cpf: user.cpf,
            createdAt: user.createdAt,
            educationLevel: EEducationLevel[user.educationLevel],
            email: user.email,
            jobTitle: user.jobTitle,
            name: user.name,
            postalCode: user.postalCode,
            race: ERace[user.race],
            role: ERoles[user.role],
            sex: EGender[user.sex],
            state: user.state,
            telephone: user.telephone,
            updatedAt: user.updatedAt,
            username: user.username,
        };

        if (withPassword) {
            return {
                ...userBase,
                password: user.password,
            } as T extends true ? IUser : never;
        } else {
            return userBase as T extends true ? never : IUserWithoutPassword;
        }
    }
}
