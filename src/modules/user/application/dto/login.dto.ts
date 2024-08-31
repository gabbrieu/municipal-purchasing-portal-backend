import { IsString } from 'class-validator';

export class LoginDto {
    @IsString()
    city: string;

    @IsString()
    password: string;

    @IsString()
    username: string;
}

export class LoginOutputDto {
    accessToken: string;
}
