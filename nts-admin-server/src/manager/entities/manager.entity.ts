import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'manager' })
export class ManagerEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('varchar', { nullable: false, unique: true })
  id: string;

  @Column('text', { nullable: true })
  pw: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  teamType: 'NTS' | 'AM';

  @Column('int', { nullable: false })
  teamId: number;

  @Column({
    type: 'date',
    nullable: true,
  })
  joinDate: Date;

  @Column('boolean', { nullable: false, default: true })
  isUsed: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}
