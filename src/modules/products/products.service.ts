import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { plainToInstance } from 'class-transformer';
import { ProductDto } from 'src/common/dto/product.dto';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { IdInvalidException } from 'src/common/exceptions/custom/id.invalid.exception';
import { BaseResponseDto } from 'src/common/dto/base.response.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async getProducts(query: any): Promise<Pagination<ProductDto>> {
        let { current = 1, pageSize = 10, mainText, sort, filter, suppliers, brands, minRating, freeShipping, cheapPrice, fastDelivery } = query;

        // Chuyển đổi kiểu dữ liệu cho `current` và `pageSize`
        const page = Number(current) || 1;
        const limit = Number(pageSize) || 10;

        const qb = this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.supplier', 'supplier')
            .leftJoinAndSelect('product.brand', 'brand')
            .leftJoinAndSelect('product.promotions', 'promotions');

        // 🔹 Search theo `mainText`
        if (mainText) {
            qb.andWhere('product.mainText LIKE :mainText', { mainText: `%${mainText}%` });
        }

        // 🔹 Filter (lọc theo `category`)
        if (filter) {
            qb.andWhere('category.name = :filter', { filter });
        }

        // 🔹 Filter theo suppliers (nếu có)
        if (suppliers) {
            const supplierIds = suppliers.split(',');
            if (supplierIds.length > 0) {
                qb.andWhere('supplier.id IN (:...supplierIds)', { supplierIds });
            }
        }

        // 🔹 Filter theo brands (nếu có)
        if (brands) {
            const brandIds = brands.split(',');
            if (brandIds.length > 0) {
                qb.andWhere('brand.id IN (:...brandIds)', { brandIds });
            }
        }

        // 🔹 Filter theo rating
        if (minRating) {
            qb.andWhere('product.rating_avg >= :minRating', { minRating: Number(minRating) });
        }

        // 🔹 Filter theo freeShipping
        if (freeShipping === 'true') {
            qb.andWhere('promotions.isFreeShip = :isFreeShip', { isFreeShip: true });
        }

        // 🔹 Filter theo cheapPrice
        if (cheapPrice === 'true') {
            qb.andWhere('promotions.isSuperCheap = :isSuperCheap', { isSuperCheap: true });
        }

        // 🔹 Filter theo fastDelivery
        if (fastDelivery === 'true') {
            qb.andWhere('promotions.isFastDelivery = :isFastDelivery', { isFastDelivery: true });
        }

        // 🔹 Sắp xếp (`sort`)
        if (sort) {
            // Đảm bảo sort là một chuỗi hợp lệ 
            const sortCode = this.getSortCode(sort.toString().trim());

            switch (sortCode) {
                case 'popular':
                    qb.orderBy('product.rating_avg', 'DESC');
                    break;
                case 'bestselling':
                    qb.orderBy('product.sold', 'DESC');
                    break;
                case 'newest':
                    qb.orderBy('product.createdAt', 'DESC');
                    break;
                case 'price-asc':
                    qb.orderBy('product.price', 'ASC');
                    break;
                case 'price-desc':
                    qb.orderBy('product.price', 'DESC');
                    break;
                default:
                    // Kiểm tra xem có phải là tên trường hợp lệ không
                    const order = sort.startsWith('-') ? 'DESC' : 'ASC';
                    const field = sort.replace(/^-/, '');
                    if (this.isValidField(field)) {
                        qb.orderBy(`product.${field}`, order as 'ASC' | 'DESC');
                    } else {
                        // Mặc định nếu trường không hợp lệ
                        qb.orderBy('product.createdAt', 'DESC');
                    }
                    break;
            }
        } else {
            // Mặc định sắp xếp theo ngày tạo nếu không có tham số sort
            qb.orderBy('product.createdAt', 'DESC');
        }

        // 🔹 Phân trang bằng `nestjs-typeorm-paginate`
        const paginatedResult = await paginate<Product>(qb, { page, limit });

        // ✅ Chuyển đổi dữ liệu sang `ProductDto`
        return {
            ...paginatedResult,
            items: plainToInstance(ProductDto, paginatedResult.items, { excludeExtraneousValues: true, enableImplicitConversion: true }),
        };
    }

    // Hàm kiểm tra tên trường hợp lệ
    private isValidField(field: string): boolean {
        const validFields = ['id', 'mainText', 'price', 'sold', 'createdAt', 'rating_avg', 'author', 'promotion', 'quantity'];
        return validFields.includes(field);
    }

    // Hàm chuyển đổi từ text hiển thị sang mã sort
    private getSortCode(sortText: string): string {
        switch (sortText) {
            case 'Phổ biến':
                return 'popular';
            case 'Bán chạy':
                return 'bestselling';
            case 'Hàng mới':
                return 'newest';
            case 'Giá thấp đến cao':
                return 'price-asc';
            case 'Giá cao đến thấp':
                return 'price-desc';
            default:
                return sortText; // Giữ nguyên giá trị nếu không khớp với các case trên
        }
    }


    async filterProduct(query: any): Promise<Pagination<ProductDto>> {
        let { current = 1, pageSize = 10, isFreeShip, isSuperCheap, isFastDelivery, nameCategory, nameBrand, nameSupplier, priceBottom, priceTop } = query;

        const page = Number(current) || 1;
        const limit = Number(pageSize) || 10;

        const qb = this.productRepository.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .leftJoinAndSelect('product.supplier', 'supplier')
            .leftJoinAndSelect('product.brand', 'brand')
            .leftJoinAndSelect('product.promotions', 'promotions');

        // 🔹 Filter theo promotion flags
        if (isFreeShip === 'true') {
            qb.andWhere('promotions.isFreeShip = :isFreeShip', { isFreeShip: true });
        }

        if (isSuperCheap === 'true') {
            qb.andWhere('promotions.isSuperCheap = :isSuperCheap', { isSuperCheap: true });
        }

        if (isFastDelivery === 'true') {
            qb.andWhere('promotions.isFastDelivery = :isFastDelivery', { isFastDelivery: true });
        }

        if (nameCategory) {
            const categoryList = nameCategory.split(',').map(nameCategory => nameCategory.trim());
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

    async getProductsByIds(productIds: number[]): Promise<Product[]> {
        return this.productRepository.findBy({ id: In(productIds) });
    }
}
