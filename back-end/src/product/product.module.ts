import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from 'src/database/entities/product.entity';
import { ProductType } from 'src/database/entities/product-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ProductService],
  controllers: [ProductController],
  imports: [
    TypeOrmModule.forFeature([Product, ProductType])
  ]
})
export class ProductModule {}
