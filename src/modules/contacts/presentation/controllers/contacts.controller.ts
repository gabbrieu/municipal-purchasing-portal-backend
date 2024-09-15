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
import { CreateContactsUseCase } from '../../application/usecases/create-contacts.usecase';
import { IContacts } from '../../domain/entities/contacts.entity';

@Controller('users/:userId/contacts')
@Roles(ERoles.USER)
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(CheckUserInterceptor)
export class ContactsController {
    constructor(
        private readonly createContactsUseCase: CreateContactsUseCase
    ) {}

    @Post()
    async create(
        @Param('userId', ParseIntPipe) userId: number,
        @Body() dto: CreateContactDTO
    ): Promise<IContacts> {
        return await this.createContactsUseCase.execute(userId, dto);
    }

    @Get(':contactsId')
    async findOne() {}

    @Get()
    async findAll() {}

    @Patch(':contactsId')
    async update() {}

    @Delete(':contactsId')
    async delete() {}
}
