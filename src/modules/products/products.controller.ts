import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ProductDto } from 'src/common/dto/product.dto';

@Controller('/api/v1')
export class ProductController {
    constructor(private readonly productsService: ProductsService) { }

    @Get('/book')
    async getBooks(@Query() query: any) {
        const books = await this.productsService.getProducts(query);
        return new BaseResponseDto<Pagination<ProductDto>>(HttpStatus.ACCEPTED, "Success", books);
    }


    @Get('/filterBook')
    async filterProduct(@Query() query: any) {
        const books = await this.productsService.filterProduct(query);
        return new BaseResponseDto<Pagination<ProductDto>>(HttpStatus.ACCEPTED, "Success", books);
    }

}
