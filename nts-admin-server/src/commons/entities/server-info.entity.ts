import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from './common.entity';
import { CenterInfoEntity } from '../../center-info/entities/center-info.entity';

@Entity({ name: 'server-info' })
export class ServerInfoEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('varchar', { nullable: false })
  ip: string;

  @Column('int', { nullable: false })
  port: number;

  @Column('varchar', { nullable: false })
  id: string;

  @Column('varchar', { nullable: false })
  pw: string;

  @OneToOne(() => CenterInfoEntity, (centerInfo) => centerInfo.idx)
  centerInfo: CenterInfoEntity;
}
