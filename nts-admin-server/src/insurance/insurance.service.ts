import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InsuranceEntity } from './entities/insurance.entity';
import {
  CustomNotFoundException,
  DuplicateException,
} from '../commons/exception/service.exception';
import { CreateInsuranceDto } from './dto/post-insurance.dto';
import { _UNIQUE_VIOLATION } from '../commons/exception/error-code';
import { UpdateInsuranceDto } from './dto/put-insurance.dto';

@Injectable()
export class InsuranceService {
  constructor(private readonly dataSource: DataSource) {}

  private logger = new Logger(InsuranceService.name);
  async findInsurance(allOrOne: 'ALL' | 'ONE', options?: { idx?: number; code?: number }) {
    const selectBuilder = this.dataSource
      .getRepository(InsuranceEntity)
      .createQueryBuilder()
      .select(['idx', 'code', 'name', 'suffix', '"NTSTeamId"'])
      .where('"isUsed" = :isUsed', { isUsed: true });

    if (options !== undefined) {
      if (options.idx !== undefined) selectBuilder.andWhere('idx = :idx', { idx: options.idx });
      if (options.code !== undefined)
        selectBuilder.andWhere('code = :code', { code: options.code });
    }

    selectBuilder.addOrderBy('code', 'ASC');

    if (allOrOne === 'ONE' && options !== undefined) {
      const insurance = await selectBuilder.getRawOne();
      if (insurance === undefined)
        throw CustomNotFoundException(`${options.idx}는 등록되지 않은 보험사 입니다.`);
      return insurance;
    } else if (allOrOne === 'ALL') {
      return await selectBuilder.getRawMany();
    }
  }
  async createInsurance(creator: string, createInsuanceDto: CreateInsuranceDto) {
    if (
      await this.dataSource
        .getRepository(InsuranceEntity)
        .createQueryBuilder()
        .where('"isUsed" = :isUsed', { isUsed: true })
        .andWhere('code = :code', { code: createInsuanceDto.code })
        .getExists()
    ) {
      throw DuplicateException(`${createInsuanceDto.code}는 이미 사용중인 코드입니다.`);
    }

    try {
      const insertResult = await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(InsuranceEntity)
        .values([{ creator, ...createInsuanceDto }])
        .execute();
      this.logger.log(`${creator}님이 ${createInsuanceDto.toString()} 보험사 정보를 등록했습니다.`);
      return { idx: insertResult.raw[0].idx };
    } catch (e) {
      if (+e.code === _UNIQUE_VIOLATION) {
        throw DuplicateException(`${createInsuanceDto.code}는 이미 사용중인 코드입니다.`);
      }
    }
  }
  async updateInsurance(updater: string, idx: number, updateInsuanceDto: UpdateInsuranceDto) {
    const insurance = await this.findInsurance('ONE', { idx });

    try {
      await this.dataSource
        .createQueryBuilder()
        .update(InsuranceEntity)
        .set({ updater, ...updateInsuanceDto })
        .where('idx = :idx', { idx })
        .execute();

      this.logger.log(`${updater}님이 ${insurance.code}번 보험사 정보를 수정했습니다.`);
      return { idx };
    } catch (e) {
      this.logger.error(e);
    }
  }
  async deleteInsurance(updater: string, idx: number) {
    await this.dataSource
      .createQueryBuilder()
      .update(InsuranceEntity)
      .set({ updater, isUsed: false })
      .where('idx = :idx', { idx })
      .execute();

    this.logger.log(`${updater}님이 ${idx}번 보험사 정보를 삭제했습니다.`);
    return { idx };
  }
}
