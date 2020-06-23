import { Column, Entity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntityV1 } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Cart extends BaseEntityV1 {

  @ManyToOne('User', 'userId')
  user: User;

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
