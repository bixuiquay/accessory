import { Column, Entity } from 'typeorm';

import { BaseEntityV1 } from './base.entity';

@Entity()
export class Brand extends BaseEntityV1 {
  @Column()
  name: string;

  /**
   * Constructor
   *
   * @param  {Partial<ProductType> } brandEntity    The partial info
   */
  constructor(brandEntity: Partial<Brand>) {
    super();
    Object.assign(this, brandEntity || {});
  }
}
