import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IJWTPayload, IReqUser } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
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
