import { Injectable } from '@angular/core'
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita'
import { CartProduct } from './cart-product..model'

/**
  * The store supports having an active attribute, holding the active entity id.
  * This can prove to be very useful in cases where you want to work with the entity that is currently active.
  */
export interface CartProductState extends EntityState<CartProduct>, ActiveState {}

/**
 * InitialState creator
 *
 * @return {CartProductState}
 */
export const createInitialState = (): CartProductState => {
  return {
    active: null,
    loading: false,
  };
}

@Injectable()
@StoreConfig({ name: 'CartProduct', idKey: 'productId',  })
export class CartProductStore extends EntityStore<CartProductState, CartProduct> {
  /**
   * Constructor
   */
  constructor() {
    super(createInitialState())
  }
}
