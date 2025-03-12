import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { Brand } from '../../entities/brand.entity'; // Đảm bảo import đúng file

@Module({
    imports: [TypeOrmModule.forFeature([Brand])], // Định nghĩa repository cho Brand
    controllers: [BrandController],
    providers: [BrandService],
    exports: [BrandService], // Export để module khác có thể sử dụng
})
export class BrandsModule { }
