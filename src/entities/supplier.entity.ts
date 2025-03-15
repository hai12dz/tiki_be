import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { BaseEntity } from './base.entity';

@Entity('suppliers')
export class Supplier extends BaseEntity {

    @Column({ unique: true })
    name: string;

    @Column()
    contactInfo: string;

    @Column()
    logo: string;

    @OneToMany(() => Product, product => product.supplier)
    products: Product[];
}
