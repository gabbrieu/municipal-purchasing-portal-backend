import { IBaseEntity } from '@core/interfaces/base.entity.interface';

export interface IContacts extends IBaseEntity {
    userId: number;
    list: Array<string>;
}
