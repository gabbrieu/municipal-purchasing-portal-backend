import { IsCNPJ } from '@core/decorators/is-cnpj.decorator';
import { IsString } from 'class-validator';

export class DeleteOneContactDTO {
    @IsCNPJ()
    @IsString()
    contact: string;
}
