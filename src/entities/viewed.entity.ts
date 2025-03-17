import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";

@Entity('viewed_products')
export class ViewedProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.viewedProducts, { onDelete: 'CASCADE' })
    user: User;

    @ManyToOne(() => Product, (product) => product.viewedProducts, { onDelete: 'CASCADE' })
    product: Product;

    @CreateDateColumn()
    viewedAt: Date;
}
