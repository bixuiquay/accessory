import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntityV1 } from './base.entity';
import { Category } from './category.entity';

@Entity()
export class ChildCategory extends BaseEntityV1 {
  @Column()
  name: string;

  @ManyToOne(type => Category, category => category.childCategories)
  category: Category;

  /**
   * Constructor
   *
   * @param  {Partial<ProductType> } childCategoryEntity    The partial info
   */
  constructor(childCategoryEntity: Partial<ChildCategory>) {
    super();
    Object.assign(this, childCategoryEntity || {});
  }
}
