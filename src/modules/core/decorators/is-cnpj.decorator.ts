import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsCNPJConstraint implements ValidatorConstraintInterface {
    validate(cnpj: string): boolean {
        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj.length !== 14) return false;

        let totalLength = cnpj.length - 2;
        let cnpjWithoutDigits = cnpj.substring(0, totalLength);
        const verificationDigits = cnpj.substring(totalLength);
        let sum = 0;
        let pos = totalLength - 7;

        for (let i = totalLength; i >= 1; i--) {
            sum += +cnpjWithoutDigits.charAt(totalLength - i) * pos--;
            if (pos < 2) pos = 9;
        }
        let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== +verificationDigits.charAt(0)) return false;

        totalLength = totalLength + 1;
        cnpjWithoutDigits = cnpj.substring(0, totalLength);
        sum = 0;
        pos = totalLength - 7;
        for (let i = totalLength; i >= 1; i--) {
            sum += +cnpjWithoutDigits.charAt(totalLength - i) * pos--;
            if (pos < 2) pos = 9;
        }

        result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
        if (result !== +verificationDigits.charAt(1)) return false;

        return true;
    }

    defaultMessage(): string {
        return 'CNPJ incorreto';
    }
}

export function IsCNPJ(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCNPJConstraint,
        });
    };
}
