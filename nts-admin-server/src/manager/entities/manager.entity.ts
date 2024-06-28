import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../commons/entities/common.entity';

@Entity({ name: 'manager' })
export class ManagerEntity extends CommonEntity {
  @Column('varchar', { nullable: false, unique: true })
  id: string;

  @Column('text', { nullable: true })
  pw: string;

  @Column('varchar', { nullable: false })
  name: string;

  @Column('varchar', { nullable: false })
  teamType: 'NTS' | 'AM';

  @Column('int', { nullable: false })
  teamId: number;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  joinDate: Date;
}
