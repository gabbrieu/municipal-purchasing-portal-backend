import { PrismaService } from '@config/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import { UserWithoutPassword } from '../types';

@Injectable()
export class FindOneUserUseCase {
    constructor(private readonly prismaService: PrismaService) {}

    async execute(
        where: Prisma.UserWhereUniqueInput,
        select?: Prisma.UserSelect<DefaultArgs>
    ): Promise<User | UserWithoutPassword> {
        return await this.prismaService.user.findUnique({
            where,
            select: select || {
                password: false,
                address: true,
                addressNumber: true,
                birthDate: true,
                cellphone: true,
                city: true,
                complement: true,
                cpf: true,
                createdAt: true,
                educationLevel: true,
                email: true,
                id: true,
                jobTitle: true,
                name: true,
                postalCode: true,
                race: true,
                role: true,
                sex: true,
                state: true,
                telephone: true,
                updatedAt: true,
                username: true,
            },
        });
    }
}
