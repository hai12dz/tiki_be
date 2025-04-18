import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order.item.entity';
import { CartItem } from './entities/cart.entity';
import { RolePermission } from './entities/role.permission.entity';
import { CategoriesModule } from './modules/category/categories.module';
import { ProductsModule } from './modules/products/products.module';
import { Supplier } from './entities/supplier.entity';
import { Brand } from './entities/brand.entity';
import { BrandsModule } from './modules/brand/brand.module';
import { SupplierModule } from './modules/supplier/supplier.module';
import { UserModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrderModule } from './modules/orders/orders.module';
import { History } from './entities/history.entity';
import { UploadModule } from './modules/upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { ProductPromotion } from './entities/promotion.entity';
import { ProductReview } from './entities/review.entity';
import { SearchModule } from './modules/search/search.module';
import { SearchSuggestion } from './entities/search.suggestion';

@Module({
  imports: [MulterModule.register({
    dest: 'public/images/avatar', // Đặt thư mục mặc định
  }),
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
      entities: [SearchSuggestion, User, Role, Permission, Product,
        Category, Order, OrderItem, CartItem, RolePermission, ProductPromotion, ProductReview, Supplier, Brand, History],
      synchronize: true, // Không dùng trong production
    }),
  }),
    AuthModule, CategoriesModule, ProductsModule, BrandsModule, SupplierModule, UserModule, OrderModule, UploadModule, SearchModule

  ],
})
export class AppModule { }
