import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}

export class AuditableEntity extends BaseEntity {
  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  createdById: string;

  @Column({ nullable: true })
  updatedBy: string;

  @Column({ nullable: true })
  updatedById: string;
}