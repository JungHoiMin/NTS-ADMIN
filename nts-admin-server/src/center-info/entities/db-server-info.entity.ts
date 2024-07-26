import { Column, Entity } from 'typeorm';
import { ServerInfoEntity } from '../../commons/entities/server-info.entity';

@Entity({ name: 'db-server-info' })
export class DbServerInfoEntity extends ServerInfoEntity {
  @Column('int', { nullable: true })
  pf: string;
}
