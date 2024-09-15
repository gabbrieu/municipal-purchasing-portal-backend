import { CreateContactDTO } from '../../application/dto/create-contacts.dto';
import { IContacts } from '../entities/contacts.entity';

export abstract class ContactsRepository {
    abstract create(userId: number, dto: CreateContactDTO): Promise<IContacts>;
}
