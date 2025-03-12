import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';
import { BaseEntity } from './base.entity';

@Entity('categories')
export class Category extends BaseEntity {

    @Column({ unique: true })
    name: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ type: 'simple-json', nullable: true })
    nameCategory: string[];


    @OneToMany(() => Product, product => product.category)
    products: Product[];


    @Column()
    url: string;

}