import { Column, Entity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntityV1 } from './base.entity';
import { Client } from './client.entity';

@Entity()
export class Cart extends BaseEntityV1 {

  @ManyToOne('Client', 'clientId')
  client: Client;

  /**
   * Constructor
   *
   * @param  {Partial<ProductType> } cartEntity    The partial info
   */
  constructor(cartEntity: Partial<Cart>) {
    super();
    Object.assign(this, cartEntity || {});
  }
}
