import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Role } from './role.entity';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { CartItem } from './cart.entity';
import { BaseEntity } from './base.entity';
import { History } from './history.entity';
import { ProductReview } from './review.entity';
@Entity('users')
export class User extends BaseEntity {


    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    @Column()
    phone: string

    @Column({ default: "default.png" })
    avatar: string;


    @ManyToOne(() => Role, role => role.id, { nullable: true })
    @JoinColumn({ name: 'role_id' })
    role: Role | null;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => Order, order => order.customer)
    orders: Order[];


    @OneToMany(() => ProductReview, review => review.user)
    reviews: ProductReview[];

    @OneToMany(() => Product, product => product.seller)
    products: Product[];

    @OneToMany(() => CartItem, cartItem => cartItem.user)
    cartItems: CartItem[];
    @Column({ type: 'varchar', nullable: true })
    refreshToken?: string | null;

    @OneToMany(() => History, (history) => history.user)
    histories: History[];


    @Column({ default: 0 })
    totalEvaluation: number; // Tổng số đánh giá của người dùng
    @Column({ default: 0 })
    totalThanks: number; // Tổng số cảm ơn của người dùng

}
