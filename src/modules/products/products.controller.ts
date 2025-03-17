import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ProductDto } from 'src/common/dto/product.dto';
import { Product } from 'src/entities/product.entity';

@Controller('/api/v1')
export class ProductController {
    constructor(private readonly productsService: ProductsService) { }

    @Get('/book')
    async getBooks(@Query() query: string) {
        const books = await this.productsService.getProducts(query);
        return new BaseResponseDto<Pagination<ProductDto>>(HttpStatus.OK, "Success", books);
    }


    @Get('/filterBook')
    async filterProduct(@Query() query: string) {
        const books = await this.productsService.filterProduct(query);
        return new BaseResponseDto<Pagination<ProductDto>>(HttpStatus.OK, "Success", books);
    }


    @Get('/book/:id')
    async getBookById(@Param('id') id: string) {

        return await this.productsService.fetchProductById(id);
    }


    @Post("/viewed")
    async getViewedProducts(@Body("productIds") productIds: number[]) {
        if (!productIds || productIds.length === 0) return [];
        const books = await this.productsService.getProductsByIds(productIds);

        return new BaseResponseDto<Product[]>(HttpStatus.OK, "Success", books);
    }


}
