import { PrismaService } from '@config/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { hashPassword } from '@utils/hash.utils';
import { UserWithoutPassword } from '../types';

@Injectable()
export class CreateUserUseCase {
    constructor(private readonly prismaService: PrismaService) {}

    async execute(dto: Prisma.UserCreateInput): Promise<UserWithoutPassword> {
        const hashedPassword: string = await hashPassword(dto.password);

        const user: User = await this.prismaService.user.create({
            data: {
                ...dto,
                password: hashedPassword,
                birthDate: new Date(dto.birthDate).toISOString(),
            },
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
    }
}
