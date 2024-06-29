import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { verifyPassword } from '@utils/hash.utils';
import { IJWTPayload } from '../../auth/types';
import { LoginDto, LoginOutputDto } from '../dto/login.dto';
import { FindOneUserUseCase } from './find-one-user.usecase';

@Injectable()
export class LoginUseCase {
    constructor(
        private readonly jwtService: JwtService,
        private readonly findOneUserUseCase: FindOneUserUseCase
    ) {}

    async execute(dto: LoginDto): Promise<LoginOutputDto> {
        const { city, username, password } = dto;

        const user = (await this.findOneUserUseCase.execute(
            {
                city,
                username,
            },
            {
                password: true,
                id: true,
                username: true,
                city: true,
                cpf: true,
                email: true,
                role: true,
            }
        )) as User;

        if (!user) {
            throw new UnauthorizedException('Wrong credentials');
        }

        const passwordMatch = await verifyPassword(password, user.password);

        if (passwordMatch) {
            throw new UnauthorizedException('Wrong credentials');
        }

        const payload: Omit<IJWTPayload, 'iat' | 'exp'> = {
            sub: user.id,
            username: user.username,
            city: user.city,
            cpf: user.cpf,
            email: user.email,
            role: user.role,
        };

        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
