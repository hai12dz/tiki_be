import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

import { BaseResponseDto } from 'src/common/dto/base.response.dto';
import { Category } from 'src/entities/category.entity';

@ApiTags('Categories')
@Controller('/categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Get('/name')
    async getCategories(): Promise<BaseResponseDto<string[]>> {
        return await this.categoriesService.getCategories();
    }



    @Get('/info')
    async getInfoCategory(@Query() query: string): Promise<BaseResponseDto<string[]>> {
        return await this.categoriesService.getInfoCategory(query);
    }




    @Get('/full')
    async getFullCategories(): Promise<BaseResponseDto<Category[]>> {
        return await this.categoriesService.getFullCategories();
    }


}
