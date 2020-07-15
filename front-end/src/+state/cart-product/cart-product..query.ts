import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { CartProduct } from './cart-product..model';
import { CartProductState, CartProductStore } from './cart-product..store'
​
@Injectable()
@QueryConfig({
  sortBy: 'updated_at',
  sortByOrder: Order.DESC
})
export class CartProductQuery extends QueryEntity<CartProductState, CartProduct> {
  /**
   * Constructor
   */
  constructor(protected store: CartProductStore) {
    super(store);
  }
}
