import { Column, Entity, OneToOne, JoinColumn, ManyToOne } from 'typeorm';

import { AuditableEntity } from './base.entity';
import { ChildCategory } from './child-category.entity';
import { Brand } from './brand.entity';

@Entity()
export class Product extends AuditableEntity {

  @Column()
  name: string;

  @ManyToOne('ChildCategory', 'childCategoryId')
  category: ChildCategory;

  @ManyToOne('Brand', 'brandId')
  brand: Brand;

  @Column()
  description: string;

  @Column( { type: 'decimal' } )
  price: number;

  @Column( { type: 'decimal' , nullable: true} )
  pricesale: number; // gia giam

  @Column( {nullable: true} )
  isfeature: boolean;  // de cu

  @Column( { nullable: true} )
  islastminute: boolean; // khuyen mai

  @Column( { nullable: true} )
  isflashsale: boolean; // flash sale

  @Column( { nullable: true} )
  iswishlist: number; // thich cho top binh chon

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
