import { Column, Entity } from 'typeorm';
import { ServerInfoEntity } from '../../commons/entities/server-info.entity';

@Entity({ name: 'app-server-info' })
export class AppServerInfoEntity extends ServerInfoEntity {
  @Column('int', { nullable: true })
  pf: string;
}
