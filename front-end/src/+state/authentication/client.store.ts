import { Injectable } from '@angular/core'
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita'
import { ClientModel } from './client.model'

/**
  * The store supports having an active attribute, holding the active entity id. 
  * This can prove to be very useful in cases where you want to work with the entity that is currently active.
  */
export interface ClientModelState extends EntityState<ClientModel>, ActiveState {}

/**
 * InitialState creator
 *
 * @return {ClientModelState}
 */
export const createInitialState = (): ClientModelState => {
  return {
    active: null,
    loading: false
  };
}

@Injectable()
@StoreConfig({ name: 'client', idKey: 'id' })
export class ClientStore extends EntityStore<ClientModelState, ClientModel> {
  /**
   * Constructor
   */
  constructor() {
    super(createInitialState())
  }
}