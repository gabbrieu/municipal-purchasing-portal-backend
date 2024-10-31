import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJWTPayload, IReqUser } from '../dto/auth.dto';

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    try {
                        const authTokens = req.cookies?.auth_tokens;
                        if (authTokens) {
                            return JSON.parse(authTokens).accessToken;
                        }
                    } catch (e) {
                        return null;
                    }
                    return null;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    validate(payload: IJWTPayload): IReqUser {
        return {
            userId: payload.sub,
            username: payload.username,
            city: payload.city,
            cpf: payload.cpf,
            email: payload.email,
            role: payload.role,
            name: payload.name,
        };
    }
}
