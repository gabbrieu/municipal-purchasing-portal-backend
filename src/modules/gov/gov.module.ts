import { HttpModule } from '@nestjs/axios';
import { Logger, Module } from '@nestjs/common';
import { SuppliersHttpService } from './suppliers/application/services/suppliers-http.service';
import { FindSuppliersUseCase } from './suppliers/application/usecases/find-suppliers.usecase';
import { SuppliersController } from './suppliers/presentation/controllers/suppliers.controller';

@Module({
    imports: [HttpModule],
    controllers: [SuppliersController],
    providers: [FindSuppliersUseCase, SuppliersHttpService, Logger],
})
export class GovModule {}
