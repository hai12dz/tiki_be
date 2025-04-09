
import { Exclude, Expose, Type } from 'class-transformer';
import { Supplier } from 'src/entities/supplier.entity';
import { SupplierDto } from './supplier.dto';

export class ProductDto {
    @Expose()

    id: string;
    @Expose()

    thumbnail: string;
    @Expose()

    slider: string[];
    @Expose()

    mainText: string;
    @Expose()

    author: string;
    @Expose()

    price: number;
    @Expose()

    promotion: number;
    @Expose()

    sold: number;

    @Expose()
    quantity: number;
    @Expose()
    rating_avg: number;

    @Expose()
    category: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

    @Expose()
    @Type(() => SupplierDto)
    supplier: SupplierDto;





}

