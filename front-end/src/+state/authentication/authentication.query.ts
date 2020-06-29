import { Injectable } from '@angular/core';
import { Order, QueryConfig, QueryEntity } from '@datorama/akita';
import { Authentication } from './authentication.model';
import { AuthenticationState, AuthenticationStore } from './authentication.store';
​
@Injectable()
@QueryConfig({
  sortBy: 'name',
  sortByOrder: Order.ASC
})
export class AuthenticationQuery extends QueryEntity<AuthenticationState, Authentication> {
  /**
   * Constructor
   */
  constructor(protected store: AuthenticationStore) {
    super(store);
  }
}