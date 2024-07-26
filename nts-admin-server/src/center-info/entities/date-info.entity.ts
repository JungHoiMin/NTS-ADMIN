import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../commons/entities/common.entity';
import { CenterInfoEntity } from './center-info.entity';

@Entity({ name: 'date-info' })
export class DateInfoEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  testStartDate: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  testEndDate: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  openDate: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  closeDate: Date;

  @OneToOne(() => CenterInfoEntity, (centerInfo) => centerInfo.idx)
  centerInfo: CenterInfoEntity;
}
