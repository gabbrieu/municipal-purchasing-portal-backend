export enum ERoles {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

export interface IReqUser {
    userId: number;
    username: string;
    name: string;
    city: string;
    cpf: string;
    email: string;
    role: ERoles;
}

export interface IJWTPayload {
    sub: number;
    username: string;
    name: string;
    city: string;
    cpf: string;
    email: string;
    role: ERoles;
    iat: number;
    exp: number;
}

export interface IRefreshTokenResponseDTO {
    accessToken: string;
    refreshToken: string;
}
