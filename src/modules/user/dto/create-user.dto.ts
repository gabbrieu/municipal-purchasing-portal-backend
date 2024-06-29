import { $Enums } from '@prisma/client';
import {
    IsDateString,
    IsEmail,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    MaxLength,
} from 'class-validator';

export class CreateUserDto {
    @MaxLength(255)
    @IsString()
    name: string;

    @MaxLength(80)
    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    @MaxLength(300)
    password: string;

    @IsDateString()
    birthDate: string;

    @Length(11, 11)
    @IsString()
    cpf: string;

    @Length(11, 11)
    @IsString()
    cellphone: string;

    @IsOptional()
    @Length(10, 10)
    @IsString()
    telephone?: string;

    @IsEnum($Enums.Gender)
    sex: $Enums.Gender;

    @IsEnum($Enums.Race)
    race: $Enums.Race;

    @IsString()
    @MaxLength(255)
    address: string;

    @IsNumber()
    addressNumber: number;

    @IsOptional()
    @MaxLength(255)
    @IsString()
    complement?: string;

    @IsString()
    @MaxLength(100)
    city: string;

    @Length(2, 2)
    @IsString()
    state: string;

    @Length(8, 8)
    @IsString()
    postalCode: string;

    @MaxLength(30)
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
