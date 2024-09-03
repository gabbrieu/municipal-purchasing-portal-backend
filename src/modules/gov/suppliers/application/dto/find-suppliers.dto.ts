import { IsEnum, IsOptional, IsString, Length } from 'class-validator';

export enum EPorte {
    ME = 'MICROEMPRESA',
    EPP = 'EMPRESA DE PEQUENO PORTE',
    D = 'DEMAIS',
}

export class FindSuppliersDTO {
    @IsOptional()
    @IsString()
    cnpj?: string;

    @IsOptional()
    @Length(7, 7)
    @IsString()
    cnae?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @Length(2, 2)
    @IsString()
    uf?: string;

    @IsOptional()
    @IsString()
    nomeFantasia?: string;

    @IsOptional()
    @IsEnum(EPorte)
    porte?: EPorte;
}
