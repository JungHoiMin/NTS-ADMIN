import { Column, Entity, PrimaryColumn } from 'typeorm';
import { CommonEntity } from '../../commons/entities/common.entity';

@Entity({ name: 'insurance' })
export class InsuranceEntity extends CommonEntity {
  @PrimaryColumn('char', { length: 2, nullable: false })
  code: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  suffix: string;

  @Column('int', { nullable: true })
  NTSTeamId: number;
}
