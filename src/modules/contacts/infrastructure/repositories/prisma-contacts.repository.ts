import { PrismaService } from '@config/prisma.service';
import { Injectable } from '@nestjs/common';
import { Contacts } from '@prisma/client';
import { CreateContactDTO } from '../../application/dto/create-contacts.dto';
import { IContacts } from '../../domain/entities/contacts.entity';
import { ContactsRepository } from '../../domain/repositories/contacts.repository.interface';

@Injectable()
export class PrismaContactsRepository implements ContactsRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async create(userId: number, dto: CreateContactDTO): Promise<IContacts> {
        const contact: Contacts = await this.prismaService.contacts.create({
            data: { list: dto.list, user: { connect: { id: userId } } },
        });

        return this.mapToDomain(contact);
    }

    private mapToDomain(contact: Contacts): IContacts {
        return {
            id: contact.id,
            list: contact.list,
            userId: contact.userId,
            createdAt: contact.createdAt,
            updatedAt: contact.updatedAt,
        };
    }
}
