import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  CustomNotFoundException,
  DuplicateException,
} from '../commons/exception/service.exception';
import { SponsorEntity } from './entities/sponsor.entity';
import { _UNIQUE_VIOLATION } from '../commons/exception/error-code';
import { CreateSponsorDto } from './dto/post-sponsor.dto';
import { UpdateSponsorDto } from './dto/put-sponsor.dto';

@Injectable()
export class SponsorService {
  constructor(private readonly dataSource: DataSource) {}

  private logger = new Logger(SponsorService.name);
  async findSponsor(allOrOne: 'ALL' | 'ONE', options?: { idx?: string }) {
    const selectBuilder = this.dataSource
      .getRepository(SponsorEntity)
      .createQueryBuilder()
      .select(['idx', 'name', 'suffix'])
      .where('"isUsed" = :isUsed', { isUsed: true });

    if (options !== undefined) {
      if (options.idx !== undefined) selectBuilder.andWhere('idx = :idx', { idx: options.idx });
    }

    selectBuilder.addOrderBy('name', 'ASC');

    if (allOrOne === 'ONE' && options && options.idx !== undefined) {
      const insurance = await selectBuilder.getRawOne();
      if (insurance === undefined)
        throw CustomNotFoundException(`${options.idx}는 등록되지 않은 idx 입니다.`);
      return insurance;
    } else if (allOrOne === 'ALL') {
      return await selectBuilder.getRawMany();
    }
  }
  async createSponsor(creator: string, createSponsorDto: CreateSponsorDto) {
    if (
      await this.dataSource
        .getRepository(SponsorEntity)
        .createQueryBuilder()
        .where('"isUsed" = :isUsed', { isUsed: true })
        .andWhere('name = :name', { name: createSponsorDto.name })
        .getExists()
    ) {
      throw DuplicateException(`${createSponsorDto.name}은 이미 사용중인 이름입니다.`);
    }

    try {
      const insertResult = await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(SponsorEntity)
        .values([createSponsorDto])
        .execute();
      this.logger.log(`${creator}님이 ${createSponsorDto.name} 스폰서사 정보를 등록했습니다.`);
      return { idx: insertResult.raw[0].idx };
    } catch (e) {
      if (+e.code === _UNIQUE_VIOLATION) {
        throw DuplicateException(`${createSponsorDto.name}는 이미 등록된 스폰서사 입니다.`);
      }
    }
  }
  async updateSponsor(updater: string, idx: string, updateSponsorDto: UpdateSponsorDto) {
    const sponsor = await this.findSponsor('ONE', { idx });

    try {
      await this.dataSource
        .createQueryBuilder()
        .update(SponsorEntity)
        .set({ updater, ...updateSponsorDto })
        .where('idx = :idx', { idx })
        .execute();

      this.logger.log(`${updater}님이 ${sponsor.idx}번 스폰서사 정보를 수정했습니다.`);
      return { idx: idx };
    } catch (e) {
      this.logger.error(e);
    }
  }
  async deleteSponsor(updater: string, idx: string) {
    await this.dataSource
      .createQueryBuilder()
      .delete()
      .from(SponsorEntity)
      .where('idx = :idx', { idx })
      .execute();

    this.logger.log(`${updater}님이 ${idx}번 스폰서사 정보를 삭제했습니다.`);
    return { idx };
  }
}
