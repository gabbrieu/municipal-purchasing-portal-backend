import { Injectable } from '@nestjs/common';
import { ErrorHandler } from '@utils/error-handler.utils';
import { IContacts } from '../../domain/entities/contacts.entity';
import { ContactsRepository } from '../../domain/repositories/contacts.repository.interface';
import { CreateContactDTO } from '../dto/create-contacts.dto';

@Injectable()
export class CreateContactsUseCase {
    constructor(private readonly contactsRepository: ContactsRepository) {}

    async execute(userId: number, dto: CreateContactDTO): Promise<IContacts> {
        try {
            return await this.contactsRepository.create(userId, dto);
        } catch (error) {
            ErrorHandler.handle(error);
        }
    }
}
