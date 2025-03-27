import { Body, Controller, Get, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { BaseResponseDto } from 'src/common/dto/base.response.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ProductDto } from 'src/common/dto/product.dto';
import { Product } from 'src/entities/product.entity';
@Controller("/products")
export class ProductController {
    constructor(private readonly productsService: ProductsService) { }

    @Get("/books")
    async getBooks(@Query() query: string) {
        const books = await this.productsService.getProducts(query);
        return new BaseResponseDto<Pagination<ProductDto>>(HttpStatus.OK, "Success", books);
    }

    @Get("/books/filter")
    async filterBooks(@Query() query: string) {
        const books = await this.productsService.filterProduct(query);
        return new BaseResponseDto<Pagination<ProductDto>>(HttpStatus.OK, "Success", books);
    }

    @Get("/books/:id")
    async getBookById(@Param("id") id: string) {
        return await this.productsService.fetchProductById(id);
    }

    @Post("/viewed")
    async getViewedProducts(@Body("productIds") productIds: number[]) {
        if (!productIds || productIds.length === 0) return [];
        const books = await this.productsService.getProductsByIds(productIds);
        return new BaseResponseDto<Product[]>(HttpStatus.OK, "Success", books);
    }
    // @Post('/file/upload')
    // async uploadBook(@Param('id') id: string) {

    //     return await this.productsService.fetchProductById(id);


    // }
}

