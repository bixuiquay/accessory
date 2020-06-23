import { Injectable } from '@angular/core'
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita'
import { Category } from './category.model'

/**
  * The store supports having an active attribute, holding the active entity id.
  * This can prove to be very useful in cases where you want to work with the entity that is currently active.
  */
export interface CategoryState extends EntityState<Category>, ActiveState {}

/**
 * InitialState creator
 *
 * @return {CategoryState}
 */
export const createInitialState = (): CategoryState => {
  return {
    active: null,
    loading: false,
  };
}

@Injectable()
@StoreConfig({ name: 'Category', idKey: 'id' })
export class CategoryStore extends EntityStore<CategoryState, Category> {
  /**
   * Constructor
   */
  constructor() {
    super(createInitialState())
  }
}
