import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Role } from './role.entity';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { CartItem } from './cart-item.entity';
import { BaseEntity } from './base.entity';
import { ViewedProduct } from './viewed.entity';

@Entity('users')
export class User extends BaseEntity {


    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    @ManyToOne(() => Role, role => role.id, { nullable: true })
    @JoinColumn({ name: 'role_id' })
    role: Role | null;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Order, order => order.customer)
    orders: Order[];


    @OneToMany(() => ViewedProduct, viewed => viewed.user)
    viewedProducts: ViewedProduct[];

    @OneToMany(() => Product, product => product.seller)
    products: Product[];

    @OneToMany(() => CartItem, cartItem => cartItem.user)
    cartItems: CartItem[];
    @Column({ type: 'varchar', nullable: true })  // ✅ Sửa kiểu dữ liệu
    refreshToken?: string | null;
}
