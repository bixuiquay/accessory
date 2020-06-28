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
  priceSale: number; 

  @Column( {nullable: true} )
  isFeatured: boolean;  

  @Column( { nullable: true} )
  isLastMinute: boolean;

  @Column( { nullable: true} )
  isFlashSale: boolean; 

  @Column( { nullable: true} )
  isWishlist: number; // 

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
