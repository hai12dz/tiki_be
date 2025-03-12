import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { BrandService } from './brand.service';

@Controller('/api/v1/brand')
export class BrandController {
    constructor(private readonly productsService: BrandService) { }

    @Get('/name-brand')
    async getBrands() {
        return await this.productsService.getBrands()
    }




}
