import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CenterInfoEntity } from './center-info.entity';
import { CommonEntity } from '../../commons/entities/common.entity';
import { InsuranceEntity } from '../../insurance/entities/insurance.entity';

@Entity({ name: 'insurance_info' })
export class InsuranceInfoEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @OneToOne(() => CenterInfoEntity, (centerInfo) => centerInfo.idx)
  centerInfo: CenterInfoEntity;

  @ManyToOne(() => InsuranceEntity, (insurance) => insurance.code)
  mainInsurance: InsuranceEntity;

  @ManyToMany(() => InsuranceEntity, (insurance) => insurance.code, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinTable()
  insuranceList: InsuranceEntity[];
}
