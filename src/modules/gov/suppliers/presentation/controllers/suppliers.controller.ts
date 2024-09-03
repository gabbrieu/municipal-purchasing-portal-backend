import { JwtAuthGuard } from '@modules/auth/services/auth.guard';
import { RolesGuard } from '@modules/auth/services/roles.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FindSuppliersDTO } from '../../application/dto/find-suppliers.dto';
import { FindSuppliersUseCase } from '../../application/usecases/find-suppliers.usecase';
import { Supplier } from '../../domain/entities/supplier.entity';

@Controller('gov/suppliers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class SuppliersController {
    constructor(private readonly findSuppliersUseCase: FindSuppliersUseCase) {}

    @Get()
    async find(@Query() dto: FindSuppliersDTO): Promise<Supplier[]> {
        return this.findSuppliersUseCase.execute(dto);
    }
}
