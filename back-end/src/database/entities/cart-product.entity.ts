import { Column, Entity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntityV1 } from './base.entity';
import { Product } from './product.entity';
import { Cart } from './cart.entity';

@Entity()
export class CartProduct extends BaseEntityV1 {

  @ManyToOne('Product', 'ProductId')
  product: Product;

  @ManyToOne('Cart', 'CartId')
  cart: Cart;

  @Column({ type: "int"})
  quantity: number;
  
  /**
   * Constructor
   *
   * @param  {Partial<ProductType> } cartProductEntity    The partial info
   */
  constructor(cartProductEntity: Partial<CartProduct>) {
    super();
    Object.assign(this, cartProductEntity || {});
  }
}
