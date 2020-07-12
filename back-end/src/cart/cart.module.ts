import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/database/entities/cart.entity';
import { CartProduct } from 'src/database/entities/cart-product.entity';
import { ContextService } from 'src/core/services';
import { Product } from 'src/database/entities/product.entity';

@Module({
  controllers: [CartController],
  providers: [CartService, ContextService],
  imports: [
    TypeOrmModule.forFeature([Cart, CartProduct, Product])
  ],
  exports: [
    CartService
  ]
})
export class CartModule {}
