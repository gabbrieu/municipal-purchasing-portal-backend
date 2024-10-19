import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    Res,
    UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IRefreshTokenResponseDTO } from '../../application/dto/auth.dto';
import {
    AuthResponseDTO,
    LoginDTO,
    LoginOutputDTO,
} from '../../application/dto/login.dto';
import { LoginUseCase } from '../../application/usecases/login.usecase';
import { RefreshTokenUseCase } from '../../application/usecases/refresh-token.usecase';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly refreshTokenUseCase: RefreshTokenUseCase
    ) {}

    @Post('login')
    async login(
        @Body() body: LoginDTO,
        @Res({ passthrough: true }) res: Response
    ): Promise<AuthResponseDTO> {
        const jwt: LoginOutputDTO = await this.loginUseCase.execute(body);

        res.cookie('auth_tokens', JSON.stringify(jwt), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prod',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
        });

        return { message: 'User logged in' };
    }

    @Post('logout')
    @HttpCode(HttpStatus.NO_CONTENT)
    logout(@Res({ passthrough: true }) res: Response): void {
        res.clearCookie('auth_tokens');
    }

    // TODO: Verificar se esse endpoint tem que ser protegido
    @Post('refresh')
    async refreshToken(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response
    ): Promise<AuthResponseDTO> {
        const authTokens: string | undefined = req.cookies.auth_tokens;

        if (!authTokens) {
            throw new UnauthorizedException('Auth tokens missing');
        }

        const parsedTokens: LoginOutputDTO = JSON.parse(authTokens);
        const tokens: IRefreshTokenResponseDTO =
            await this.refreshTokenUseCase.execute(parsedTokens.refreshToken);

        res.cookie('auth_tokens', JSON.stringify(tokens), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'prod',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 dias
        });

        return { message: 'Tokens refreshed' };
    }
}
