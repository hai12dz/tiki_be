import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { OrderItem } from './order.item.entity';
import { BaseEntity } from './base.entity';
import { History } from './history.entity';
@Entity('orders')
export class Order extends BaseEntity {


    @ManyToOne(() => User, user => user.orders)
    customer: User;

    @Column('decimal', { precision: 10, scale: 2 })
    totalPrice: number;

    @Column({ type: 'enum', enum: ['pending', 'completed', 'cancelled'], default: 'completed' })
    paymentStatus: string;

    @Column({ default: true })
    isActive: boolean;

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    orderItems: OrderItem[];
    @Column({ nullable: true })
    paymentRef: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    address: string;

    @Column({ type: "enum", enum: ["COD", "BANKING"], default: "COD" })
    type: string;


    @Column({ type: "json" }) // Lưu mảng `detail` dạng JSON
    detail: any;

    @OneToMany(() => History, (history) => history.order)
    histories: History[];


}