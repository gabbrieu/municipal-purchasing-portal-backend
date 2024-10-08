import { CheckUserInterceptor } from '@core/interceptors/check-user.interceptor';
import { Roles } from '@modules/auth/application/decorators/roles.decorator';
import { ERoles } from '@modules/auth/application/dto/auth.dto';
import { JwtAuthGuard } from '@modules/auth/application/services/auth.guard';
import { RolesGuard } from '@modules/auth/application/services/roles.guard';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { CreateContactDTO } from '../../application/dto/create-contacts.dto';
import { DeleteOneContactDTO } from '../../application/dto/delete-one-contact.dto';
import { UpdateContactsDTO } from '../../application/dto/update-contacts.dto';
import { CreateContactsUseCase } from '../../application/usecases/create-contacts.usecase';
import { DeleteOneContactUseCase } from '../../application/usecases/delete-one-contact.usecase';
import { FindContactsUseCase } from '../../application/usecases/find-contacts.usecase';
import { UpdateContactsUseCase } from '../../application/usecases/update-contacts.usecase';
import { IContacts } from '../../domain/entities/contacts.entity';

@Controller('users/:userId/contacts')
@Roles(ERoles.USER)
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(CheckUserInterceptor)
export class ContactsController {
    constructor(
        private readonly createContactsUseCase: CreateContactsUseCase,
        private readonly findContactsUseCase: FindContactsUseCase,
        private readonly updateContactsUseCase: UpdateContactsUseCase,
        private readonly deleteOneContactUseCase: DeleteOneContactUseCase
    ) {}

    @Post()
    async create(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() dto: CreateContactDTO
    ): Promise<IContacts> {
        return this.createContactsUseCase.execute(userId, dto);
    }

    @Get(':contactsId')
    async findOne(
        @Param('contactsId', ParseIntPipe) id: number,
        @Param('userId', ParseIntPipe) userId: number
    ): Promise<IContacts> {
        return this.findContactsUseCase.execute({ id, userId });
    }

    @Get()
    async findAllByUser(
        @Param('userId', ParseIntPipe) userId: number
    ): Promise<IContacts> {
        return this.findContactsUseCase.execute({ userId });
    }

    @Patch(':contactsId')
    async update(
        @Param('contactsId', ParseIntPipe) id: number,
        @Param('userId', ParseIntPipe) userId: number,
        @Body() dto: UpdateContactsDTO
    ): Promise<IContacts> {
        return this.updateContactsUseCase.execute(id, userId, dto);
    }

    @Delete(':contactsId/:contact')
    async delete(
        @Param('contactsId', ParseIntPipe) id: number,
        @Param('userId', ParseIntPipe) userId: number,
        @Param() params: DeleteOneContactDTO
    ): Promise<IContacts> {
        return this.deleteOneContactUseCase.execute(id, userId, params);
    }
}
