import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

export enum ResourceType {
  Product = 'Product',
  Category = 'Category',
  ChildCategory = 'ChildCategory',
  Order = 'Order',
  Brand = 'Brand',
  Delivery = 'Delivery',
  Guest = 'Guest'
}

@Entity()
export class UserRole extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: "jsonb", nullable: true})
  resources: ResourceType[];

  /**
   * Constructor
   *
   * @param  {Partial<UserRole> } userRole    The partial info
   */
  constructor(userRole: Partial<UserRole>) {
    super();
    Object.assign(this, userRole || {});
  }
}
