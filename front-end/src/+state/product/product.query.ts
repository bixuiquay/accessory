import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { Product } from './product.model';
import { ProductState, ProductStore } from './product.store'
​
@Injectable()
@QueryConfig({
  sortBy: 'updated_at',
  sortByOrder: Order.DESC
})
export class ProductQuery extends QueryEntity<ProductState, Product> {
  /**
   * Constructor
   */
  constructor(protected store: ProductStore) {
    super(store);
  }
}
