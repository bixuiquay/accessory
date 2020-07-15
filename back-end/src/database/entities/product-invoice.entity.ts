import {
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';
import { Invoice } from './invoice.entity';

@Entity()
export class ProductInvoice extends BaseEntity {

  @ManyToOne('Product', 'ProductId')
  product: Product;

  @ManyToOne(type => Invoice, invoice => invoice.productInvoices)
  invoice: Invoice;

  @Column({ type: "int"})
  quantity: number;
  
  /**
   * Constructor
   *
   * @param  {Partial<ProductType> } productInvoice    The partial info
   */
  constructor(productInvoice: Partial<ProductInvoice>) {
    super();
    Object.assign(this, productInvoice || {});
  }
}
