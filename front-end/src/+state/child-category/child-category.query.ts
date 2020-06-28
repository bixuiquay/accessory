import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { ChildCategory } from './child-category.model';
import { ChildCategoryState, ChildCategoryStore } from './child-category.store'
​
@Injectable()
@QueryConfig({
  sortBy: 'updated_at',
  sortByOrder: Order.DESC
})
export class ChildCategoryQuery extends QueryEntity<ChildCategoryState, ChildCategory> {
  /**
   * Constructor
   */
  constructor(protected store: ChildCategoryStore) {
    super(store);
  }
}
