import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { UserRole } from './entities/user-role.entity';
import { User } from './entities/user.entity';
import { ChildCategory } from './entities/child-category.entity';
import { Cart } from './entities/cart.entity';
import { CartProduct } from './entities/cart-product.entity';
import { Brand } from './entities/brand.entity';
import { Client } from './entities/client.entity';
import { Invoice } from './entities/invoice.entity';
import { ProductInvoice } from './entities/product-invoice.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'useradmin',
      password: process.env.DB_PASSWORD || 'Admin@12345',
      database: process.env.DB_NAME || 'accessory',
      entities: [Product, Category, User, UserRole, ChildCategory, Cart, CartProduct, Brand, Client, Invoice, ProductInvoice],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
