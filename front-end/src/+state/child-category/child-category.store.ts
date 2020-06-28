import { Injectable } from '@angular/core'
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita'
import { ChildCategory } from './child-category.model'

/**
  * The store supports having an active attribute, holding the active entity id.
  * This can prove to be very useful in cases where you want to work with the entity that is currently active.
  */
export interface ChildCategoryState extends EntityState<ChildCategory>, ActiveState {}

/**
 * InitialState creator
 *
 * @return {ChildCategoryState}
 */
export const createInitialState = (): ChildCategoryState => {
  return {
    active: null,
    loading: false,
  };
}

@Injectable()
@StoreConfig({ name: 'ChildCategory', idKey: 'id' })
export class ChildCategoryStore extends EntityStore<ChildCategoryState, ChildCategory> {
  /**
   * Constructor
   */
  constructor() {
    super(createInitialState())
  }
}
