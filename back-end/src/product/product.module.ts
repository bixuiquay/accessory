import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from 'src/database/entities/product.entity';
import { Category } from 'src/database/entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildCategory } from 'src/database/entities/child-category.entity';
import { ProductConverter } from './product.converter';

@Module({
  providers: [ProductService, ProductConverter],
  controllers: [ProductController],
  imports: [
    TypeOrmModule.forFeature([Product, ChildCategory])
  ]
})
export class ProductModule {}
