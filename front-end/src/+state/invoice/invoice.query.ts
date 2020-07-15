import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { Invoice } from './invoice.model';
import { InvoiceState, InvoiceStore } from './invoice.store'
​
@Injectable()
@QueryConfig({
  sortBy: 'updated_at',
  sortByOrder: Order.DESC
})
export class InvoiceQuery extends QueryEntity<InvoiceState, Invoice> {
  /**
   * Constructor
   */
  constructor(protected store: InvoiceStore) {
    super(store);
  }
}
