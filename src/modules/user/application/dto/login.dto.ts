import { IsString } from 'class-validator';

export class LoginDTO {
    @IsString()
    city: string;

    @IsString()
    password: string;

    @IsString()
    username: string;
}

export class LoginOutputDTO {
    accessToken: string;
}

export class AuthResponseDTO {
    message: string;
}
