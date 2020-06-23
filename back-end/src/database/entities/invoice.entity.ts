import { Column, Entity, OneToOne, JoinColumn, Unique, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import {Client} from './client.entity';
import {Cart} from './cart.entity';
import {User} from './user.entity';

@Entity()
export class Invoice extends BaseEntity{
  @Column({
    unique: true
  })
  username: string;

  @Column({
    unique: true
  })
  email: string;

  @Column( { nullable: true } )
  lastName: string;

  @Column({ nullable: true })
  firstName: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  phone: number;

  @Column()
  statuspayment: string;

  @Column()
  statusship: string;

  @OneToOne('User', 'userId')
  userId: User

  @ManyToOne('Client', 'clientId')
  client: Client

  @OneToOne('Cart', 'cartId')
  cartId: Cart

  @Column( { type: 'decimal' } )
  payment: number;

  /**
   * Constructor
   *
   * @param  {Partial<User> } user    The partial info
   */
  constructor(client: Partial<Client>) {
    super()
    Object.assign(this, client || {});
  }
}
