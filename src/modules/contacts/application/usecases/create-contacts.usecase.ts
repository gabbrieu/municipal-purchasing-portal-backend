import { Injectable, Logger } from '@nestjs/common';
import { ErrorHandler } from '@utils/error-handler.utils';
import { IContacts } from '../../domain/entities/contacts.entity';
import { ContactsRepository } from '../../domain/repositories/contacts.repository.interface';
import { CreateContactDTO } from '../dto/create-contacts.dto';

@Injectable()
export class CreateContactsUseCase {
    private readonly logger: Logger = new Logger(CreateContactsUseCase.name);

    constructor(private readonly contactsRepository: ContactsRepository) {}

    async execute(userId: number, dto: CreateContactDTO): Promise<IContacts> {
        try {
            this.logger.log('Creating contacts');

            const contacts = await this.contactsRepository.create(userId, dto);

            this.logger.log('Contacts created');

            return contacts;
        } catch (error) {
            ErrorHandler.handle(error);
        }
    }
}
