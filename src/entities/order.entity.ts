import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { OrderItem } from './order-item.entity';
import { BaseEntity } from './base.entity';

@Entity('orders')
export class Order extends BaseEntity {


    @ManyToOne(() => User, user => user.orders)
    customer: User;

    @Column('decimal', { precision: 10, scale: 2 })
    totalPrice: number;

    @Column({ type: 'enum', enum: ['pending', 'completed', 'cancelled'], default: 'pending' })
    status: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];
}