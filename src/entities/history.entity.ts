import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Order } from "./order.entity";

@Entity()
export class History {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    type: string; // Loại đơn hàng (COD, PayPal,...)

    @Column()
    email: string;

    @Column()
    phone: string;

    @ManyToOne(() => User, (user) => user.histories)
    user: User;

    @ManyToOne(() => Order, (order) => order.histories, { nullable: true })
    order: Order;

    @Column({ type: "json" })
    detail: { bookName: string; quantity: number; _id: string }[];

    @Column({ type: "decimal", precision: 10, scale: 2 })
    totalPrice: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    paymentStatus: string; // Trạng thái thanh toán

    @Column({ nullable: true })
    paymentRef: string; // Mã giao dịch thanh toán (nếu có)
}
