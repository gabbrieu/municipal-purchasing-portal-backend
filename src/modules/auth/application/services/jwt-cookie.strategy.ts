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
                    return req.cookies.auth_token;
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
        };
    }
}
