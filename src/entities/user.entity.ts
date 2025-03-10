import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Role } from './role.entity';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { CartItem } from './cart-item.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    @ManyToOne(() => Role, role => role.id)
    role: Role;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Order, order => order.customer)
    orders: Order[];

    @OneToMany(() => Product, product => product.seller)
    products: Product[];

    @OneToMany(() => CartItem, cartItem => cartItem.user)
    cartItems: CartItem[];
}
