import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '../../commons/entities/common.entity';
import { InsuranceInfoEntity } from './insurance-info.entity';
import { SponsorEntity } from '../../sponsor/entities/sponsor.entity';
import { SslvpnServerInfoEntity } from './sslvpn-server-info.entity';
import { DbServerInfoEntity } from './db-server-info.entity';
import { AppServerInfoEntity } from './app-server-info.entity';
import { DbInfoEntity } from './db-info.entity';
import { OnnaraInfoEntity } from './onnara-info.entity';
import { CallHandlerModuleEntity } from '../../call-handler-module/entities/call-handler-module.entity';
import { DateInfoEntity } from './date-info.entity';

@Entity({ name: 'center_info' })
export class CenterInfoEntity extends CommonEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column('varchar', { nullable: false })
  centerName: string;

  @Column('varchar', { nullable: true })
  centerCode: string;

  @OneToOne(() => InsuranceInfoEntity, (insuranceInfo) => insuranceInfo.idx, {
    cascade: ['insert', 'update', 'remove'],
  })
  @JoinColumn()
  insuranceInfo: InsuranceInfoEntity;

  @ManyToOne(() => SponsorEntity, (sponsor) => sponsor.idx)
  @JoinColumn()
  sponsor: SponsorEntity;

  @Column('varchar', { nullable: true })
  agencyName: string;

  @OneToOne(() => SslvpnServerInfoEntity, (sslvpnInfo) => sslvpnInfo.idx)
  @JoinColumn()
  sslvpnInfo: SslvpnServerInfoEntity;

  @OneToOne(() => DbServerInfoEntity, (dbServerInfo) => dbServerInfo.idx)
  @JoinColumn()
  dbServerInfo: DbServerInfoEntity;

  @OneToOne(() => AppServerInfoEntity, (appInfo) => appInfo.idx)
  @JoinColumn()
  appServerInfo: AppServerInfoEntity;

  @OneToOne(() => DbInfoEntity, (dbInfo) => dbInfo.idx)
  @JoinColumn()
  dbInfo: DbInfoEntity;

  @Column('boolean', { nullable: false, default: true })
  useIntegSalesTable: boolean;

  @Column('boolean', { nullable: false, default: true })
  useOnnara: boolean;

  @OneToOne(() => OnnaraInfoEntity, (onnaraInfo) => onnaraInfo.idx)
  @JoinColumn()
  onnaraInfo: OnnaraInfoEntity;

  @ManyToOne(() => CallHandlerModuleEntity, (callHandlerModule) => callHandlerModule.idx)
  @JoinColumn()
  callHandlerModule: CallHandlerModuleEntity;

  @Column('boolean', { nullable: false, default: true })
  usePDS: boolean;

  @Column('varchar', { nullable: true })
  memo: string;

  @OneToOne(() => DateInfoEntity, (dateInfo) => dateInfo.idx)
  @JoinColumn()
  dateInfo: DateInfoEntity;
}
