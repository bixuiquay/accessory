import { Injectable, NotFoundException } from '@nestjs/common';
import { Cart } from 'src/database/entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryFailedError } from 'typeorm';
import { CartCreateRequest, CartProductRequest } from './cart.dto';
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
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(CartProduct)
    private readonly cartProductRepository: Repository<CartProduct>,
    private readonly contextService: ContextService,
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

    const exitedCart = exitedData[0];
    const cartProductQueryBuilder = this.cartProductRepository.createQueryBuilder('cartProduct');
    cartProductQueryBuilder.leftJoinAndSelect('cartProduct.product', 'cartProduct.productId');
    cartProductQueryBuilder.leftJoinAndSelect('cartProduct.cart', 'cartProduct.cartId');
    cartProductQueryBuilder.where('cartProduct.cart.id =:cartId', {cartId: exitedCart.id});
    let cartProducts = await cartProductQueryBuilder.getMany();
    cartProducts = cartProducts.map(x => {
      const imageHost = process.env.IMAGE_HOST;
      x.product = {
        ...x.product,
        image: `${imageHost}/${x.product.image}`,
        listImage: x.product.listImage.map(x => `${imageHost}/${x}`)
      };

      return x;
    })
    
    return {
      ...exitedCart,
      cartProducts,
    }
  }

  async update(id: number, update: CartProductRequest): Promise<any> {
    //to do search cart is not ordered queryBuilder.andWhere('cart.ordered = false');

    const cart = await this.repository.findOne(id);
    if (!cart) {
      throw new NotFoundException();
    }

    const productInfo = await this.productRepository.findOne(update.productId);
    if (!productInfo) {
      throw new NotFoundException();
    }

    let updateData = await this.cartProductRepository
    .findOne({product: new Product({id: update.productId}), cart: new Cart({id})});

    if (!updateData) {
      updateData = {
        ...updateData,
        cart: new Cart({id}),
        product: new Product({id: update.productId}),
        quantity: update.quantity
      }
    }

    updateData.quantity = update.quantity;
    return await this.cartProductRepository.save(updateData);
  }

  async delete(id, productId) {
    return await this.cartProductRepository.delete({cart: new Cart({id}), product: new Product({id: productId})});
  }

  async get(id: number): Promise<any>{
    const cartProductQueryBuilder = this.cartProductRepository.createQueryBuilder('cartProduct');
    cartProductQueryBuilder.leftJoinAndSelect('cartProduct.product', 'cartProduct.productId');
    cartProductQueryBuilder.leftJoinAndSelect('cartProduct.cart', 'cartProduct.cartId');
    cartProductQueryBuilder.where('cartProduct.cart.id =:cartId', {cartId: id});
    let cartProducts = await cartProductQueryBuilder.getMany();
    cartProducts = cartProducts.map(x => {
      const imageHost = process.env.IMAGE_HOST;
      x.product = {
        ...x.product,
        image: `${imageHost}/${x.product.image}`,
        listImage: x.product.listImage.map(x => `${imageHost}/${x}`),
      };

      return {...x, productId: x.product.id};
    })

    return {
      id,
      cartProducts,
    }
  }
}
