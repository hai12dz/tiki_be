import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from 'src/entities/brand.entity';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';

@Injectable()
export class BrandService {
    constructor(
        @InjectRepository(Brand)
        private readonly brandRepository: Repository<Brand>,
    ) { }


    async getBrands(): Promise<BaseResponseDto<Brand[]>> {
        const brands = await this.brandRepository.find(); // Thêm await
        return new BaseResponseDto<Brand[]>(HttpStatus.OK, 'Success', brands);
    }


}
