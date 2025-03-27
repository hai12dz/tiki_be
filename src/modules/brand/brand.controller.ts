import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { BrandService } from './brand.service';

@Controller('/brand')
export class BrandController {
    constructor(private readonly productsService: BrandService) { }

    @Get('/name')
    async getBrands() {
        return await this.productsService.getBrands()
    }




}
