
import { Exclude, Expose } from 'class-transformer';

export class ProductDto {
    @Expose()

    _id: string;
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

    sold: number;

    @Expose()
    quantity: number;

    @Expose()
    category: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;

}

