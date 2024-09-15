import { PrismaService } from '@config/prisma.service';
import { Module } from '@nestjs/common';
import { CreateContactsUseCase } from './application/usecases/create-contacts.usecase';
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
    ],
})
export class ContactsModule {}
