import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { BaseEntity } from './base.entity';

@Entity('brands')
export class Brand extends BaseEntity {

    @Column({ unique: true })
    name: string;

    @Column({ nullable: true })
    logo: string;

    @OneToMany(() => Product, product => product.brand)
    products: Product[];
}
