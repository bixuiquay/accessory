import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Client extends BaseEntity{
  @Column({
    unique: true,
    nullable: true
  })
  username: string;

  @Column({
    unique: true
  })
  email: string;

  @Column({ nullable: true } )
  lastName: string;

  @Column({ nullable: true })
  firstName: string;

  @Column()
  passwordHash: string;

  @Column({ nullable: true })
  address: string;

  @Column( { nullable: true } )
  city: string;

  @Column({ nullable: true })
  phone: string;

  /**
   * Constructor
   *
   * @param  {Partial<client> } client    The partial info
   */
  constructor(client: Partial<Client>) {
    super()
    Object.assign(this, client || {});
  }
}
