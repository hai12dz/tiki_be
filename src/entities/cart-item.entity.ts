import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity('cart_items')
export class CartItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.cartItems)
    user: User;

    @ManyToOne(() => Product, product => product.cartItems)
    product: Product;

    @Column({ default: 1 })
    quantity: number;

    @Column({ default: true })
    isActive: boolean;
}