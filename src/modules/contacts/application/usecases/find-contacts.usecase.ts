import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ErrorHandler } from '@utils/error-handler.utils';
import { IContacts } from '../../domain/entities/contacts.entity';
import {
    ContactsRepository,
    ContactsWhere,
} from '../../domain/repositories/contacts.repository.interface';

@Injectable()
export class FindContactsUseCase {
    private readonly logger: Logger = new Logger(FindContactsUseCase.name);

    constructor(private readonly contactsRepository: ContactsRepository) {}

    async execute(where: ContactsWhere): Promise<IContacts> {
        try {
            this.logger.log(
                `Finding contacts with params: ${JSON.stringify(where)}`
            );
            const contacts = await this.contactsRepository.find(where);

            if (!contacts) throw new NotFoundException(`Contacts not found`);

            this.logger.log(`Contacts found`);
            return contacts;
        } catch (error) {
            ErrorHandler.handle(error);
        }
    }
}
