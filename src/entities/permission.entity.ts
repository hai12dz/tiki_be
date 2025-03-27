import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RolePermission } from './role.permission.entity';
import { BaseEntity } from './base.entity';

@Entity('permissions')
export class Permission extends BaseEntity {


    @Column({ unique: true })
    name: string;

    @OneToMany(() => RolePermission, (rolePermission) => rolePermission.permission)
    rolePermissions: RolePermission[];
}
