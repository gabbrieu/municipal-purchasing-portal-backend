import { Roles } from '@modules/auth/application/decorators/roles.decorator';
import { ERoles } from '@modules/auth/application/dto/auth.dto';
import { JwtAuthGuard } from '@modules/auth/application/services/auth.guard';
import { RolesGuard } from '@modules/auth/application/services/roles.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FindSuppliersDTO } from '../../application/dto/find-suppliers.dto';
import { FindSuppliersUseCase } from '../../application/usecases/find-suppliers.usecase';
import { Supplier } from '../../domain/entities/supplier.entity';

@Controller('gov/suppliers')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ERoles.USER)
export class SuppliersController {
    constructor(private readonly findSuppliersUseCase: FindSuppliersUseCase) {}

    @Get()
    async find(@Query() dto: FindSuppliersDTO): Promise<Supplier[]> {
        return this.findSuppliersUseCase.execute(dto);
    }
}
