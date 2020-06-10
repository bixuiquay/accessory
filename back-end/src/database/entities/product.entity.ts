import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';

import { AuditableEntity } from './base.entity';
import { ProductType } from './product-type.entity';

@Entity()
export class Product extends AuditableEntity {

  @Column()
  name: string;

  @OneToOne(type => ProductType)
  @JoinColumn()
  type: ProductType;

  @Column()
  description: string;

  @Column( { type: 'decimal' } )
  price: string;

  @Column({ type: 'integer'})
  quantity: number;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'jsonb' })
  listImage: string[];

  /**
   * Constructor
   *
   * @param  {Partial<Product> } product    The partial info
   */
  constructor(product: Partial<Product>) {
    super();
    Object.assign(this, product || {});
  }
}
