import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { plainToInstance } from 'class-transformer';
import { ProductDto } from 'src/common/dto/product.dto';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { IdInvalidException } from 'src/common/exceptions/custom/id-invalid.exception';
import { BaseResponseDto } from 'src/common/dto/base-response.dto';

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
        const limit = Number(pageSize) || 10

        const qb = this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.supplier', 'supplier'); // ✅ Thêm JOIN supplier

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
            const field = sort.replace(/^-/, '');
            qb.orderBy(`product.${field}`, order as 'ASC' | 'DESC');
        }

        // 🔹 Phân trang bằng `nestjs-typeorm-paginate`
        const paginatedResult = await paginate<Product>(qb, { page, limit });

        // ✅ Chuyển đổi dữ liệu sang `ProductDto`
        return {
            ...paginatedResult,
            items: plainToInstance(ProductDto, paginatedResult.items, { excludeExtraneousValues: true, enableImplicitConversion: true }),

        };

    }


    async filterProduct(query: any): Promise<Pagination<ProductDto>> {
        let { current = 1, pageSize = 10, nameCategory, nameBrand, nameSupplier, priceBottom, priceTop } = query;

        const page = Number(current) || 1;
        const limit = Number(pageSize) || 10;

        const qb = this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.supplier', 'supplier')
            .leftJoinAndSelect('product.brand', 'brand');



        if (nameCategory) {
            const categoryList = nameCategory.split(',').map(nameCategory => nameCategory.trim()); // Tách danh sách
            qb.andWhere('category.name IN (:...categoryList)', { categoryList });
        }
        // 🔹 Filter theo nhiều brand
        if (nameBrand) {
            const brandList = nameBrand.split(',').map(brand => brand.trim()); // Tách danh sách
            qb.andWhere('brand.name IN (:...brandList)', { brandList });
        }

        // 🔹 Filter theo nhiều supplier
        if (nameSupplier) {
            const supplierList = nameSupplier.split(',').map(supplier => supplier.trim()); // Tách danh sách
            qb.andWhere('supplier.name IN (:...supplierList)', { supplierList });
        }

        // 🔹 Filter theo giá
        if (priceBottom && priceTop) {
            qb.andWhere('product.price BETWEEN :priceBottom AND :priceTop', { priceBottom, priceTop });
        }

        // 🔹 Phân trang bằng `nestjs-typeorm-paginate`
        const paginatedResult = await paginate<Product>(qb, { page, limit });

        return {
            ...paginatedResult,
            items: plainToInstance(ProductDto, paginatedResult.items, { excludeExtraneousValues: true }),
        };
    }

    async fetchProductById(query: string) {
        const res = await this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.supplier', 'supplier') // ✅ JOIN bảng supplier
            .where('product.id = :id', { id: parseInt(query, 10) })
            .getOne(); // Lấy 1 sản phẩm duy nhất

        if (!res) {
            return new BaseResponseDto<ProductDto>(HttpStatus.OK, "Không tìm thấy sản phẩm!");
        }

        return new BaseResponseDto<ProductDto>(
            HttpStatus.OK,
            "Success!",
            plainToInstance(ProductDto, res, {
                excludeExtraneousValues: true,
                enableImplicitConversion: true
            })
        );
    }








}
