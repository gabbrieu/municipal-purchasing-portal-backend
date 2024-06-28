import { $Enums } from '@prisma/client';
import {
    IsDateString,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsDateString()
    birthDate: string;

    @IsString()
    cpf: string;

    @IsString()
    cellphone: string;

    @IsOptional()
    @IsString()
    telephone?: string;

    @IsEnum($Enums.Gender)
    sex: $Enums.Gender;

    @IsEnum($Enums.Race)
    race: $Enums.Race;

    @IsString()
    address: string;

    @IsNumber()
    addressNumber: number;

    @IsOptional()
    @IsString()
    complement?: string;

    @IsString()
    city: string;

    @IsString()
    state: string;

    @IsString()
    postalCode: string;

    @IsString()
    username: string;

    @IsString()
    jobTitle: string;

    @IsOptional()
    @IsEnum($Enums.Roles)
    role?: $Enums.Roles;

    @IsEnum($Enums.EducationLevel)
    educationLevel: $Enums.EducationLevel;
}
