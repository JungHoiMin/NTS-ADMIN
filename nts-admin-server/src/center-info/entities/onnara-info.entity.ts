import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CenterInfoEntity } from './center-info.entity';
import { CommonEntity } from '../../commons/entities/common.entity';

@Entity({ name: 'onnara_info' })
export class OnnaraInfoEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('varchar', { nullable: true })
  onnaraCenterCode: string;

  @Column('varchar', { nullable: true })
  onnaraCenterName: string;

  @Column('varchar', { nullable: true })
  onnaraDBName: string;

  @OneToOne(() => CenterInfoEntity, (centerInfo) => centerInfo.idx)
  centerInfo: CenterInfoEntity;
}
