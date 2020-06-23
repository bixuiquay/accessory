import { Column, Entity, OneToOne, JoinColumn, Unique, ManyToOne } from 'typeorm';
import { UserRole } from './user-role.entity';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity{
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

  @ManyToOne('UserRole', 'userRoleId')
  role: UserRole;

  @Column()
  passwordHash: string;

  /**
   * Constructor
   *
   * @param  {Partial<User> } user    The partial info
   */
  constructor(user: Partial<User>) {
    super()
    Object.assign(this, user || {});
  }
}
