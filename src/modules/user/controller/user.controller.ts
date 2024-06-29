import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { Roles } from '../../auth/roles.decorator';
import { JwtAuthGuard } from '../../auth/services/auth.guard';
import { RolesGuard } from '../../auth/services/roles.guard';
import { ERoles, IReqUser } from '../../auth/types';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto, LoginOutputDto } from '../dto/login.dto';
import { UserWithoutPassword } from '../types';
import { CreateUserUseCase } from '../usecases/create-user.usecase';
import { FindOneUserUseCase } from '../usecases/find-one-user.usecase';
import { LoginUseCase } from '../usecases/login.usecase';

@Controller('users')
@Roles(ERoles.USER)
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly loginUseCase: LoginUseCase,
        private readonly findOneUserUseCase: FindOneUserUseCase
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(ERoles.ADMIN)
    async create(@Body() body: CreateUserDto): Promise<UserWithoutPassword> {
        return await this.createUserUseCase.execute(body);
    }

    @Post('login')
    async login(@Body() body: LoginDto): Promise<LoginOutputDto> {
        return await this.loginUseCase.execute(body);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard, RolesGuard)
    getProfile(@Request() req): IReqUser {
        return req.user as IReqUser;
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    async findOneById(@Param('id') id: string) {
        return await this.findOneUserUseCase.execute({ id: +id });
    }
}
