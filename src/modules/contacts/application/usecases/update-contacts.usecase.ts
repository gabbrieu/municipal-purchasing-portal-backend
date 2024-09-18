import { Injectable, Logger } from '@nestjs/common';
import { ErrorHandler } from '@utils/error-handler.utils';
import { IContacts } from '../../domain/entities/contacts.entity';
import { ContactsRepository } from '../../domain/repositories/contacts.repository.interface';
import { UpdateContactsDTO } from '../dto/update-contacts.dto';
import { FindContactsUseCase } from './find-contacts.usecase';

@Injectable()
export class UpdateContactsUseCase {
    private readonly logger: Logger = new Logger(UpdateContactsUseCase.name);

    constructor(
        private readonly findContactsUseCase: FindContactsUseCase,
        private readonly contactsRepository: ContactsRepository
    ) {}

    async execute(
        id: number,
        userId: number,
        dto: UpdateContactsDTO
    ): Promise<IContacts> {
        try {
            this.logger.log(`Adding the following contacts: ${dto.list}`);

            const contacts: IContacts = await this.findContactsUseCase.execute({
                id,
                userId,
            });

            const newContactsList: string[] = this.removeDuplicatedContacts(
                contacts.list,
                dto.list
            );

            contacts.list = newContactsList;
            const contactsUpdated: IContacts =
                await this.contactsRepository.update(contacts);

            this.logger.log(`Contacts updated successfully`);

            return contactsUpdated;
        } catch (error) {
            ErrorHandler.handle(error);
        }
    }

    private removeDuplicatedContacts(
        listOnDb: string[],
        listToUpdate: string[]
    ): string[] {
        return Array.from(new Set([...listOnDb, ...listToUpdate]));
    }
}
