import { Injectable, Logger } from '@nestjs/common';
import { ErrorHandler } from '@utils/error-handler.utils';
import { Supplier } from '../../domain/entities/supplier.entity';
import { EPorte, FindSuppliersDTO } from '../dto/find-suppliers.dto';
import { SuppliersHttpService } from '../services/suppliers-http.service';

@Injectable()
export class FindSuppliersUseCase {
    private readonly logger: Logger = new Logger(FindSuppliersUseCase.name);

    constructor(private readonly suppliersHttpService: SuppliersHttpService) {}

    async execute(dto: FindSuppliersDTO): Promise<Supplier[]> {
        try {
            this.logger.log(
                `Finding suppliers with params: ${JSON.stringify(dto)}`
            );

            const queryParams = await this.buildQueryParams(dto);
            const suppliers =
                await this.suppliersHttpService.getSuppliers(queryParams);

            this.logger.log(`Suppliers found`);
            return suppliers;
        } catch (error) {
            ErrorHandler.handle(error);
        }
    }

    private async buildQueryParams(dto: FindSuppliersDTO): Promise<string> {
        let queryParams = '';

        if (dto.uf)
            queryParams += this.addQueryParam(queryParams, 'uf', dto.uf);
        if (dto.cnpj)
            queryParams += this.addQueryParam(queryParams, 'cnpj', dto.cnpj);
        if (dto.nomeFantasia)
            queryParams += this.addQueryParam(
                queryParams,
                'nome',
                dto.nomeFantasia
            );
        if (dto.city)
            queryParams += this.addQueryParam(
                queryParams,
                'id_municipio',
                await this.suppliersHttpService.getCityId(dto.city)
            );
        if (dto.cnae)
            queryParams += this.addQueryParam(
                queryParams,
                'id_cnae',
                await this.suppliersHttpService.getCNAEId(
                    this.formatCNAE(dto.cnae)
                )
            );
        if (dto.porte)
            queryParams += this.addQueryParam(
                queryParams,
                'id_porte_empresa',
                this.mapPorte(dto.porte)
            );

        return queryParams;
    }

    private addQueryParam(
        queryParams: string,
        key: string,
        value: string | number
    ): string {
        const symbol = queryParams.length > 0 ? '&' : '?';
        return `${symbol}${key}=${value}`;
    }

    private formatCNAE(cnae: string): string {
        return `${cnae.slice(0, 4)}-${cnae[4]}/${cnae.slice(5)}`;
    }

    private mapPorte(porte: EPorte): number {
        const porteMap = {
            [EPorte.ME]: 1,
            [EPorte.EPP]: 3,
            [EPorte.D]: 5,
        };
        return porteMap[porte];
    }
}
