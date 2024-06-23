import { Column, Entity } from 'typeorm';
import { CommonEntity } from '../../commons/entities/common.entity';

@Entity({ name: 'sponsor' })
export class SponsorEntity extends CommonEntity {
  @Column('varchar', { nullable: false, unique: false })
  name: string;

  @Column('varchar', { nullable: false, unique: false })
  suffix: string;
}
