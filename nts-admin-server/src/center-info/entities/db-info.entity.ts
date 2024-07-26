import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../commons/entities/common.entity';

@Entity({ name: 'db-info' })
export class DbInfoEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: true })
  sourceDB: string;

  @Column('int', { nullable: false })
  port: number;

  @Column('int', { nullable: false })
  pf: number;
}
