import { Column, Entity } from 'typeorm';

import { AuditableEntity } from './base.entity';

@Entity()
export class ProductType extends AuditableEntity {
  @Column()
  name: string;

  /**
   * Constructor
   *
   * @param  {Partial<ProductType> } productTypeEntity    The partial info
   */
  constructor(productTypeEntity: Partial<ProductType>) {
    super();
    Object.assign(this, productTypeEntity || {});
  }
}
