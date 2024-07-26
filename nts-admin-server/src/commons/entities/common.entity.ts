import { BaseEntity, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class CommonEntity extends BaseEntity {
  @Column('boolean', { nullable: false, default: true })
  isUsed: boolean;

  @Column('varchar', { nullable: true })
  creator: string;

  @Column('varchar', { nullable: true })
  updater: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false,
  })
  updatedAt: Date;
}
