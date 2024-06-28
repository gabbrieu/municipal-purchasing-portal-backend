import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../../config/prisma.service';

@Injectable()
export class CreateUserUseCase {
    constructor(private readonly prismaService: PrismaService) {}

    async execute(dto: Prisma.UserCreateInput): Promise<User> {
        return await this.prismaService.user.create({ data: dto });
    }
}
