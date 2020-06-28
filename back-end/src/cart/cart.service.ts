import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart } from 'src/database/entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { CartCreateRequest, CartUpdateRequest } from './cart.dto';
import { constants } from 'buffer';
import { Client } from 'src/database/entities/client.entity';
import { ContextService } from 'src/core/services';
import { CartProduct } from 'src/database/entities/cart-product.entity';
import { Product } from 'src/database';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly repository: Repository<Cart>,
    @InjectRepository(CartProduct)
    private readonly cartProductRepository: Repository<Cart>,
      ) {}

  getAll(): Promise<any> {
    return this.repository.createQueryBuilder('cart')
    .getMany();
  }

  async add(cartCreate: CartCreateRequest): Promise<any> {
    //check client have any a cart
    const queryBuilder = this.repository.createQueryBuilder('cart');
    queryBuilder.where('cart.client.id =:clientId', {clientId: cartCreate.clientId});
    const exitedData = await queryBuilder.getMany();
    if (!exitedData.length) {
      const entity = {
         client: new Client({id: cartCreate.clientId})
      }
      return this.repository.save(entity);
    }
    
    return exitedData[0];
  }

  // async update(id: number, update: CartUpdateRequest): Promise<any> {
  //   const {sub, username } = this.contextService.user;
  //   const queryBuilder = this.repository.createQueryBuilder('cart');
  //   queryBuilder.where('cart.client.id =:clientId', {clientId: sub});
  //   queryBuilder.andWhere('cart.id =:id', {id: id});
  //   //to do search cart is not ordered queryBuilder.andWhere('cart.ordered = false');

  //   const exitedData = await queryBuilder.getMany();
  //   if (exitedData && !exitedData.length) {
  //     throw new NotFoundException();
  //   }
  //   const cart = exitedData[0];
    
  //   const saveCartProduct = {
  //     cart: new Cart({id}),
  //     product: new Product({id: update.productId}),
  //     quantity: update.quantity
  //   };
  //   return await this.cartProductrepository.save({saveCartProduct});
    
  // }

  // delete(id: number): Promise<any>{
  //   return this.repository.delete(
  //     {id}
  //   );
  // }

}
