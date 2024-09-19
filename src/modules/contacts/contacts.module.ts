import { PrismaService } from '@config/prisma.service';
import { Module } from '@nestjs/common';
import { CreateContactsUseCase } from './application/usecases/create-contacts.usecase';
import { DeleteOneContactUseCase } from './application/usecases/delete-one-contact.usecase';
import { FindContactsUseCase } from './application/usecases/find-contacts.usecase';
import { UpdateContactsUseCase } from './application/usecases/update-contacts.usecase';
import { ContactsRepository } from './domain/repositories/contacts.repository.interface';
import { PrismaContactsRepository } from './infrastructure/repositories/prisma-contacts.repository';
import { ContactsController } from './presentation/controllers/contacts.controller';

@Module({
    controllers: [ContactsController],
    providers: [
        {
            provide: ContactsRepository,
            useClass: PrismaContactsRepository,
        },
        CreateContactsUseCase,
        PrismaService,
        FindContactsUseCase,
        UpdateContactsUseCase,
        DeleteOneContactUseCase,
    ],
})
export class ContactsModule {}
