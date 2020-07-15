import { Column, Entity, OneToOne, JoinColumn, Unique, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import {Client} from './client.entity';
import {User} from './user.entity';
import { ProductInvoice } from './product-invoice.entity';

export enum StatusPayment {
  New = 'New',
  Progress = 'Progress',
  Completed = 'Completed'
}

export enum StatusShip {
  New = 'New',
  Progress = 'Progress',
  Completed = 'Completed'
}

@Entity()
export class Invoice extends BaseEntity{

  @Column()
  email: string;

  @Column( { nullable: true } )
  lastName: string;

  @Column({ nullable: true })
  firstName: string;

  @Column()
  address: string;

  @Column()
  note: string;

  @Column()
  city: string;

  @Column()
  phone: string;

  @Column()
  statusPayment: string;

  @Column()
  statusShip: string;

  @OneToOne('User', 'userId')
  user: User

  @ManyToOne('Client', 'clientId')
  client: Client

  @Column( { type: 'decimal' } )
  payment: number;

  @OneToMany(type => ProductInvoice, productInvoice => productInvoice.invoice)
  productInvoices: ProductInvoice[];

  /**
   * Constructor
   *
   * @param  {Partial<Invoice> } user    The partial info
   */
  constructor(invoice: Partial<Invoice>) {
    super()
    Object.assign(this, invoice || {});
  }
}
