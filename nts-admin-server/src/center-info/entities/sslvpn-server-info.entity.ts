import { Column, Entity } from 'typeorm';
import { ServerInfoEntity } from '../../commons/entities/server-info.entity';

@Entity({ name: 'sslvpn-server-info' })
export class SslvpnServerInfoEntity extends ServerInfoEntity {
  @Column('boolean', { nullable: false, default: false })
  isDirect: boolean;
}
