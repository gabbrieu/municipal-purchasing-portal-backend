import { ERoles } from '@modules/auth/types';
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
import {
    EEducationLevel,
    EGender,
    ERace,
} from '../../domain/entities/user.entity';

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

    @IsEnum(EGender)
    sex: EGender;

    @IsEnum(ERace)
    race: ERace;

    @IsString()
    @MaxLength(255)
    address: string;

    @IsNumber()
    addressNumber: number;

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

    @IsEnum(EEducationLevel)
    educationLevel: EEducationLevel;

    @IsOptional()
    @Length(10, 10)
    @IsString()
    telephone?: string;

    @IsOptional()
    @IsEnum(ERoles)
    role?: ERoles;

    @IsOptional()
    @MaxLength(255)
    @IsString()
    complement?: string;
}
