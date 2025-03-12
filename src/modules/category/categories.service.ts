import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../../entities/category.entity';
import { BaseResponseDto } from '../../common/dto/base-response.dto';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }

    async getCategories(): Promise<BaseResponseDto<string[]>> {
        const categories = await this.categoryRepository.find();
        const categoryNames = categories.map(category => category.name);

        return new BaseResponseDto<string[]>(HttpStatus.OK, 'Success', categoryNames);
    }


    async getInfoCategory(query: any): Promise<BaseResponseDto<string[]>> {
        const { name } = query;

        const categories = await this.categoryRepository.findOne({
            where: { name: name }
        });

        const categoryNames = categories?.nameCategory;

        return new BaseResponseDto<string[]>(HttpStatus.OK, 'Success', categoryNames);
    }


    async getFullCategories(): Promise<BaseResponseDto<Category[]>> {
        const categories = await this.categoryRepository.find();

        return new BaseResponseDto<Category[]>(HttpStatus.OK, 'Success', categories);
    }

}
