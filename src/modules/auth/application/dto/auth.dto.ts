import { $Enums } from '@prisma/client';

export enum ERoles {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export interface IReqUser {
    userId: number;
    username: string;
    city: string;
    cpf: string;
    email: string;
    role: $Enums.Roles;
}

export interface IJWTPayload {
    sub: number;
    username: string;
    city: string;
    cpf: string;
    email: string;
    role: $Enums.Roles;
    iat: number;
    exp: number;
}
