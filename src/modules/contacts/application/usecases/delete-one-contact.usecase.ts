import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ErrorHandler } from '@utils/error-handler.utils';
import { IContacts } from '../../domain/entities/contacts.entity';
import { ContactsRepository } from '../../domain/repositories/contacts.repository.interface';
import { DeleteOneContactDTO } from '../dto/delete-one-contact.dto';
import { FindContactsUseCase } from './find-contacts.usecase';

@Injectable()
export class DeleteOneContactUseCase {
    private readonly logger: Logger = new Logger(DeleteOneContactUseCase.name);

    constructor(
        private readonly findContactsUseCase: FindContactsUseCase,
        private readonly contactsRepository: ContactsRepository
    ) {}

    async execute(
        id: number,
        userId: number,
        dto: DeleteOneContactDTO
    ): Promise<IContacts> {
        try {
            this.logger.log('Deleting one contact');
            const { contact } = dto;

            const contacts: IContacts = await this.findContactsUseCase.execute({
                id,
                userId,
            });

            this.removeContact(contact, contacts);
            const response = await this.contactsRepository.update(contacts);

            this.logger.log('Contact deleted from the list');

            return response;
        } catch (error) {
            ErrorHandler.handle(error);
        }
    }

    private removeContact(
        contactToRemove: string,
        contactsEntity: IContacts
    ): void {
        const index: number = contactsEntity.list.findIndex(
            (c) => c === contactToRemove
        );
        if (index === -1)
            throw new BadRequestException('Contact is not on the list');

        contactsEntity.list.splice(index, 1);
    }
}
