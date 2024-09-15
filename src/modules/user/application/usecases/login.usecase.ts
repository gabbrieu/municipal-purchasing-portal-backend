import { IJWTPayload } from '@modules/auth/application/dto/auth.dto';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ErrorHandler } from '@utils/error-handler.utils';
import { HashUtils } from '@utils/hash.utils';
import { IUser } from '../../domain/entities/user.entity';
import { LoginDto, LoginOutputDto } from '../dto/login.dto';
import { FindOneUserUseCase } from './find-one-user.usecase';

@Injectable()
export class LoginUseCase {
    private readonly logger: Logger = new Logger(LoginUseCase.name);

    constructor(
        private readonly jwtService: JwtService,
        private readonly findOneUserUseCase: FindOneUserUseCase
    ) {}

    async execute(dto: LoginDto): Promise<LoginOutputDto> {
        try {
            this.logger.log('Logging in...');

            const { city, username, password: passwordSent } = dto;

            const user: IUser = await this.getUser(city, username);
            await this.checkIfPasswordMatch(passwordSent, user.password);

            const payload: Omit<IJWTPayload, 'iat' | 'exp'> = {
                sub: user.id,
                username: user.username,
                city: user.city,
                cpf: user.cpf,
                email: user.email,
                role: user.role,
            };

            this.logger.log('User logged in');
            return {
                accessToken: this.jwtService.sign(payload),
            };
        } catch (error) {
            ErrorHandler.handle(error);
        }
    }

    private async getUser(city: string, username: string): Promise<IUser> {
        this.logger.log('Getting user');

        const user = await this.findOneUserUseCase.execute(
            {
                city,
                username,
            },
            true
        );

        if (!user) {
            throw new UnauthorizedException('Wrong credentials');
        }

        this.logger.log('User found');
        return user;
    }

    private async checkIfPasswordMatch(
        passwordSent: string,
        correctPassword: string
    ): Promise<void> {
        this.logger.log('Checking if password match');

        const passwordMatch = await HashUtils.verifyPassword(
            passwordSent,
            correctPassword
        );

        if (!passwordMatch) {
            throw new UnauthorizedException('Wrong credentials');
        }

        this.logger.log('Password matched');
    }
}