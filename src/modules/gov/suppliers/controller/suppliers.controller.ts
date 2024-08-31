import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/services/auth.guard';
import { RolesGuard } from '../../../auth/services/roles.guard';
import { FindSuppliersDTO } from '../dto/find-suppliers.dto';
import { Supplier } from '../entities/supplier.entity';
import { FindSuppliersUseCase } from '../usecases/find-suppliers.usecase';

@Controller('gov/suppliers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SuppliersController {
    constructor(private readonly findSuppliersUseCase: FindSuppliersUseCase) {}

    @Get()
    async find(@Query() dto: FindSuppliersDTO): Promise<Supplier[]> {
        return this.findSuppliersUseCase.execute(dto);
    }
}
