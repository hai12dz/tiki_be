import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { SupplierService } from './supplier.service';

@Controller('/api/v1/suppliers')
export class SupplierController {
    constructor(private readonly supplyService: SupplierService) { }

    @Get('/name-supplier')
    async getBrands() {
        return await this.supplyService.getSuppliers()
    }




}
