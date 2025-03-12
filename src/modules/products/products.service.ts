import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { plainToInstance } from 'class-transformer';
import { ProductDto } from 'src/common/dto/product.dto';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async getProducts(query: any): Promise<Pagination<ProductDto>> {
        let { current = 1, pageSize = 10, mainText, sort, filter } = query;

        // Chuyển đổi kiểu dữ liệu cho `current` và `pageSize`
        const page = Number(current) || 1;
        const limit = Number(pageSize) || 10;

        const qb = this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category');

        // 🔹 Search theo `mainText`
        if (mainText) {
            qb.andWhere('product.mainText LIKE :mainText', { mainText: `%${mainText}%` });
        }

        // 🔹 Filter (lọc theo `category`)
        if (filter) {
            qb.andWhere('category.name = :filter', { filter });
        }

        // 🔹 Sắp xếp (`sort`)
        if (sort) {
            const order = sort.startsWith('-') ? 'DESC' : 'ASC';
            const field = sort.replace(/^-/, ''); // Loại bỏ dấu '-' nếu có
            qb.orderBy(`product.${field}`, order as 'ASC' | 'DESC');
        }

        // 🔹 Phân trang bằng `nestjs-typeorm-paginate`
        const paginatedResult = await paginate<Product>(qb, { page, limit });
        // Chuyển đổi dữ liệu sang `ProductDto`
        return {
            ...paginatedResult,
            items: plainToInstance(ProductDto, paginatedResult.items, { excludeExtraneousValues: true }),
        };
    }
}
