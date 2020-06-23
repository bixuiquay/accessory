import { Column, Entity, OneToOne, JoinColumn, Unique, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Client extends BaseEntity{
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
  passwordHash: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  phone: string;

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
