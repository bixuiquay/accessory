import { Injectable } from '@angular/core'
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita'
import { Product } from './product.model'

/**
  * The store supports having an active attribute, holding the active entity id.
  * This can prove to be very useful in cases where you want to work with the entity that is currently active.
  */
export interface ProductState extends EntityState<Product>, ActiveState {}

/**
 * InitialState creator
 *
 * @return {ProductState}
 */
export const createInitialState = (): ProductState => {
  return {
    active: null,
    loading: false,
  };
}

@Injectable()
@StoreConfig({ name: 'Product', idKey: 'id' })
export class ProductStore extends EntityStore<ProductState, Product> {
  /**
   * Constructor
   */
  constructor() {
    super(createInitialState())
  }
}
