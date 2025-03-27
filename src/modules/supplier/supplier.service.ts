import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from 'src/entities/brand.entity';
import { BaseResponseDto } from 'src/common/dto/base.response.dto';
import { Supplier } from 'src/entities/supplier.entity';

@Injectable()
export class SupplierService {
    constructor(
        @InjectRepository(Supplier)
        private readonly supplierRepository: Repository<Supplier>,
    ) { }


    async getSuppliers(): Promise<BaseResponseDto<Supplier[]>> {
        const suppliers = await this.supplierRepository.find();
        return new BaseResponseDto<Supplier[]>(HttpStatus.OK, 'Success', suppliers);
    }


}
