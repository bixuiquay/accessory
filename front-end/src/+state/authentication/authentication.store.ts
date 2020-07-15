import { Injectable } from '@angular/core'
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita'
import { Authentication } from './authentication.model'

/**
  * The store supports having an active attribute, holding the active entity id. 
  * This can prove to be very useful in cases where you want to work with the entity that is currently active.
  */
export interface AuthenticationState extends EntityState<Authentication>, ActiveState {}

/**
 * InitialState creator
 *
 * @return {AuthenticationState}
 */
export const createInitialState = (): AuthenticationState => {
  return {
    active: null,
    loading: false
  };
}

@Injectable()
@StoreConfig({ name: 'auth', idKey: 'id' })
export class AuthenticationStore extends EntityStore<AuthenticationState, Authentication> {
  /**
   * Constructor
   */
  constructor() {
    super(createInitialState())
  }
}