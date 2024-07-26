import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../commons/entities/common.entity';

@Entity({ name: 'call-handler-module' })
export class CallHandlerModuleEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('varchar', { nullable: false })
  name: string;
}
