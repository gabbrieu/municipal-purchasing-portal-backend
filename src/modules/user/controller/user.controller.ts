import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthGuard } from '../../auth/auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { ERoles } from '../../auth/roles.enum';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateUserUseCase } from '../usecases/create-user.usecase';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {}

    @Post()
    @Roles(ERoles.ADMIN)
    async create(@Body() body: CreateUserDto): Promise<User> {
        return await this.createUserUseCase.execute(body);
    }
}
