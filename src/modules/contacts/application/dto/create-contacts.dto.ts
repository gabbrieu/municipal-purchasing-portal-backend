import { IsCNPJ } from '@core/decorators/is-cnpj.decorator';
import { IsArray, IsString } from 'class-validator';

export class CreateContactDTO {
    @IsCNPJ({ each: true })
    @IsString({ each: true })
    @IsArray()
    list: Array<string>;
}
