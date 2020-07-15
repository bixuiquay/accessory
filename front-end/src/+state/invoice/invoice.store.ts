import { Injectable } from '@angular/core'
import { ActiveState, EntityState, EntityStore, StoreConfig } from '@datorama/akita'
import { Invoice } from './invoice.model'

/**
  * The store supports having an active attribute, holding the active entity id.
  * This can prove to be very useful in cases where you want to work with the entity that is currently active.
  */
export interface InvoiceState extends EntityState<Invoice>, ActiveState {}

/**
 * InitialState creator
 *
 * @return {InvoiceState}
 */
export const createInitialState = (): InvoiceState => {
  return {
    active: null,
    loading: false,
  };
}

@Injectable()
@StoreConfig({ name: 'Invoice', idKey: 'id' })
export class InvoiceStore extends EntityStore<InvoiceState, Invoice> {
  /**
   * Constructor
   */
  constructor() {
    super(createInitialState())
  }
}
