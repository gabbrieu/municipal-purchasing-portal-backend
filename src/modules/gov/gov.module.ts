import { HttpModule } from '@nestjs/axios';
import { Logger, Module } from '@nestjs/common';
import { SuppliersController } from './suppliers/controller/suppliers.controller';
import { SuppliersHttpService } from './suppliers/services/suppliers-http.service';
import { FindSuppliersUseCase } from './suppliers/usecases/find-suppliers.usecase';

@Module({
    imports: [HttpModule],
    controllers: [SuppliersController],
    providers: [FindSuppliersUseCase, SuppliersHttpService, Logger],
})
export class GovModule {}
