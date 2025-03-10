import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';
import { OrderItem } from './order-item.entity';
import { CartItem } from './cart-item.entity';

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column()
    thumbnail: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({ default: 0 })
    stock: number;

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
