import { ERoles } from '@modules/auth/application/dto/auth.dto';

export enum EGender {
    MASCULINO = 'MASCULINO',
    FEMININO = 'FEMININO',
}

export enum ERace {
    AMARELA = 'AMARELA',
    BRANCA = 'BRANCA',
    PARDA = 'PARDA',
    INDIGENA = 'INDIGENA',
    PRETA = 'PRETA',
}

export enum EEducationLevel {
    ANALFABETO = 'ANALFABETO',
    ENSINO_FUNDAMENTAL_COMPLETO = 'ENSINO_FUNDAMENTAL_COMPLETO',
    ENSINO_MEDIO_INCOMPLETO = 'ENSINO_MEDIO_INCOMPLETO',
    ENSINO_MEDIO_COMPLETO = 'ENSINO_MEDIO_COMPLETO',
    GRADUACAO_INCOMPLETO = 'GRADUACAO_INCOMPLETO',
    GRADUACAO_COMPLETO = 'GRADUACAO_COMPLETO',
    POS_GRADUACAO_INCOMPLETO = 'POS_GRADUACAO_INCOMPLETO',
    POS_GRADUACAO_COMPLETO = 'POS_GRADUACAO_COMPLETO',
    MESTRADO_INCOMPLETO = 'MESTRADO_INCOMPLETO',
    MESTRADO_COMPLETO = 'MESTRADO_COMPLETO',
    DOUTORADO_INCOMPLETO = 'DOUTORADO_INCOMPLETO',
    DOUTORADO_COMPLETO = 'DOUTORADO_COMPLETO',
    POS_DOUTORADO_INCOMPLETO = 'POS_DOUTORADO_INCOMPLETO',
    POS_DOUTORADO_COMPLETO = 'POS_DOUTORADO_COMPLETO',
}

export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    birthDate: Date;
    cpf: string;
    cellphone: string;
    telephone: string | null;
    sex: EGender;
    race: ERace;
    address: string;
    addressNumber: number;
    complement: string | null;
    city: string;
    state: string;
    postalCode: string;
    username: string;
    jobTitle: string;
    role: ERoles;
    educationLevel: EEducationLevel;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserWithoutPassword extends Omit<IUser, 'password'> {}
