import { FindOneUserUseCase } from '@modules/user/application/usecases/find-one-user.usecase';
import { IUserWithoutPassword } from '@modules/user/domain/entities/user.entity';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJWTPayload, IRefreshTokenResponseDTO } from '../dto/auth.dto';

@Injectable()
export class RefreshTokenUseCase {
    private readonly logger: Logger = new Logger(RefreshTokenUseCase.name);

    constructor(
        private readonly jwtService: JwtService,
        private readonly findOneUserUseCase: FindOneUserUseCase
    ) {}

    async execute(refreshToken: string): Promise<IRefreshTokenResponseDTO> {
        try {
            this.logger.log('Refreshing token');

            const payload: IJWTPayload =
                this.jwtService.verify<IJWTPayload>(refreshToken);

            const user: IUserWithoutPassword =
                await this.findOneUserUseCase.execute({
                    id: payload.sub,
                });

            return this.handleNewTokens(user);
        } catch (error) {
            throw new UnauthorizedException(
                error?.message || 'Error while refreshing token'
            );
        }
    }

    private handleNewTokens(
        user: IUserWithoutPassword
    ): IRefreshTokenResponseDTO {
        const tokenUser: Omit<IJWTPayload, 'iat' | 'exp'> =
            this.getTokenPayload(user);

        const newAccessToken: string = this.jwtService.sign(tokenUser, {
            expiresIn: '10m',
        });
        const newRefreshToken: string = this.jwtService.sign(tokenUser, {
            expiresIn: '7d',
        });

        this.logger.log('New tokens created');

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
        };
    }

    private getTokenPayload(
        user: IUserWithoutPassword
    ): Omit<IJWTPayload, 'iat' | 'exp'> {
        return {
            sub: user.id,
            username: user.username,
            city: user.city,
            cpf: user.cpf,
            email: user.email,
            role: user.role,
        };
    }
}
