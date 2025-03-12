import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolePermission } from './role-permission.entity';
import { BaseEntity } from './base.entity';

@Entity('roles')
export class Role extends BaseEntity {


    @Column({ type: 'enum', enum: ['admin', 'seller', 'user'], unique: true })
    name: string;

    @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
    rolePermissions: RolePermission[];
}
