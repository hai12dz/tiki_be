import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';

/**
 * Bảng quản lý các khuyến mãi và ưu đãi đặc biệt
 */
@Entity('product_promotions')
export class ProductPromotion extends BaseEntity {
    @ManyToOne(() => Product, product => product.promotions)
    product: Product;

    @Column({ default: false })
    isFastDelivery: boolean;  // Giao siêu tốc

    @Column({ default: false })
    isSuperCheap: boolean;  // Siêu rẻ

    @Column({ default: false })
    isFreeShip: boolean;  // Free ship
}
