import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.orderItems)
    order: Order;

    @ManyToOne(() => Product, product => product.orderItems)
    product: Product;

    @ManyToOne(() => User, user => user.orders)
    seller: User;

    @Column()
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;
}
