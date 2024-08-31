import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { Supplier } from '../entities/supplier.entity';

@Injectable()
export class SuppliersHttpService {
    private readonly logger: Logger = new Logger(SuppliersHttpService.name);
    private readonly _baseURL: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        const govBaseURL: string =
            this.configService.getOrThrow<string>('GOV_BASE_URL');
        this._baseURL = govBaseURL + '/fornecedores/v1';
    }

    async getCityId(city: string): Promise<number> {
        this.logger.log(`Getting city id with: ${city}`);

        const response = await lastValueFrom(
            this.httpService.get(
                `${this._baseURL}/municipios.json?nome=${city}`
            )
        );
        if (response.data.count === 0) {
            throw new NotFoundException('City not found');
        }

        this.logger.log(`City found`);
        return response.data._embedded.municipios[0].id;
    }

    async getCNAEId(cnae: string): Promise<number> {
        this.logger.log(`Getting CNAE id with: ${cnae}`);

        const response = await lastValueFrom(
            this.httpService.get(
                `${this._baseURL}/cnaes.json?codigo_longo=${cnae}`
            )
        );
        if (response.data.count === 0) {
            throw new NotFoundException('CNAE not found');
        }

        this.logger.log(`CNAE found`);
        return response.data._embedded.cnaes[0].id;
    }

    async getSuppliers(queryParams: string): Promise<Supplier[]> {
        this.logger.log(`Getting Suppliers in GOV system`);

        const response = await lastValueFrom(
            this.httpService.get(
                `${this._baseURL}/fornecedores.json${queryParams}`
            )
        );
        return response.data._embedded.fornecedores;
    }
}
