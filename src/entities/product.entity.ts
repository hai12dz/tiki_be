import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';
import { OrderItem } from './order.item.entity';
import { CartItem } from './cart.entity';
import { BaseEntity } from './base.entity';
import { Supplier } from './supplier.entity';
import { Brand } from './brand.entity';
import { ProductPromotion } from './promotion.entity';
import { ProductReview } from './review.entity';

@Entity('products')
export class Product extends BaseEntity {

    @Column()
    mainText: string;

    @Column()
    author: string;

    @Column()
    thumbnail: string;

    @Column({ type: 'simple-json', nullable: true })
    slider: string[];

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column()
    rating_avg: number

    @Column({ default: 0 })
    sold: number;

    @Column()
    quantity: number;

    @Column()
    promotion: number

    @ManyToOne(() => Category, category => category.products)
    category: Category;

    @ManyToOne(() => User, user => user.products)
    seller: User;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => OrderItem, orderItem => orderItem.product)
    orderItems: OrderItem[];
    @OneToMany(() => ProductPromotion, promotion => promotion.product)
    promotions: ProductPromotion[];

    @OneToMany(() => ProductReview, review => review.product)
    reviews: ProductReview[];


    @OneToMany(() => CartItem, cartItem => cartItem.product)
    cartItems: CartItem[];

    @ManyToOne(() => Supplier, supplier => supplier.products, { nullable: true })
    supplier: Supplier;

    @ManyToOne(() => Brand, brand => brand.products, { nullable: true })
    brand: Brand;





}
