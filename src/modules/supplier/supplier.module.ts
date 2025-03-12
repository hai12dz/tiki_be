import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from 'src/entities/supplier.entity'; // Đúng đường dẫn
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Supplier])], // Định nghĩa repository
    controllers: [SupplierController],
    providers: [SupplierService],
    exports: [SupplierService], // Xuất để module khác có thể sử dụng
})
export class SupplierModule { }
