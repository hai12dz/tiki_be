import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CartItem } from './entities/cart-item.entity';
import { RolePermission } from './entities/role-permission.entity';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/category/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { Supplier } from './entities/supplier.entity';
import { Brand } from './entities/brand.entity';
import { BrandsModule } from './modules/brand/brand.module';
import { SupplierModule } from './modules/supplier/supplier.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Load biến môi trường từ .env
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Role, Permission, Product, Category, Order, OrderItem, CartItem, RolePermission, Supplier, Brand],
        synchronize: true, // Không dùng trong production
      }),
    }),
    AuthModule, CategoriesModule, ProductsModule, BrandsModule, SupplierModule

  ],
})
export class AppModule { }
