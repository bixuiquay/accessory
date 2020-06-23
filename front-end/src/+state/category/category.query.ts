import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { Category } from './category.model';
import { CategoryState, CategoryStore } from './category.store'
​
@Injectable()
@QueryConfig({
  sortBy: 'updated_at',
  sortByOrder: Order.DESC
})
export class CategoryQuery extends QueryEntity<CategoryState, Category> {
  /**
   * Constructor
   */
  constructor(protected store: CategoryStore) {
    super(store);
  }
}
