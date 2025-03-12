import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';
import { OrderItem } from './order-item.entity';
import { CartItem } from './cart-item.entity';
import { BaseEntity } from './base.entity';

@Entity('products')
export class Product extends BaseEntity {


    @Column()
    mainText: string;

    @Column()
    author: string

    @Column()
    thumbnail: string;

    @Column({ type: 'simple-json', nullable: true })
    slider: string[];


    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({ default: 0 })
    sold: number;

    @Column()
    quantity: number

    @ManyToOne(() => Category, category => category.products)
    category: Category;

    @ManyToOne(() => User, user => user.products)
    seller: User;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => OrderItem, orderItem => orderItem.product)
    orderItems: OrderItem[];

    @OneToMany(() => CartItem, cartItem => cartItem.product)
    cartItems: CartItem[];
}
