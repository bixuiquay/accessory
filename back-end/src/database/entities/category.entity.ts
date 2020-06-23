import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntityV1 } from './base.entity';
import { ChildCategory } from './child-category.entity';

@Entity()
export class Category extends BaseEntityV1 {
  @Column()
  name: string;

  @Column({nullable: true})
  shortName: string;

  @OneToMany(type => ChildCategory, child => child.category, { nullable: true})
  childCategories: ChildCategory[];
  /**
   * Constructor
   *
   * @param  {Partial<ProductType> } productTypeEntity    The partial info
   */
  constructor(productTypeEntity: Partial<Category>) {
    super();
    Object.assign(this, productTypeEntity || {});
  }
}
