import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductType } from './entities/product-type.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'useradmin',
      password: process.env.DB_PASSWORD || 'Admin@12345',
      database: process.env.DB_NAME || 'accessory',
      entities: [Product, ProductType],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
