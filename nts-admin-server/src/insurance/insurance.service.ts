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
  async findInsurance(allOrOne: 'ALL' | 'ONE', options?: { code?: string }) {
    const selectBuilder = this.dataSource
      .getRepository(InsuranceEntity)
      .createQueryBuilder()
      .select(['code', 'name', 'suffix', '"NTSTeamId"'])
      .where('"isUsed" = :isUsed', { isUsed: true });

    if (options !== undefined) {
      if (options.code !== undefined)
        selectBuilder.andWhere('code = :code', { code: options.code });
    }

    selectBuilder.addOrderBy('code', 'ASC');

    if (allOrOne === 'ONE' && options && options.code !== undefined) {
      const insurance = await selectBuilder.getRawOne();
      if (insurance === undefined)
        throw CustomNotFoundException(`${options.code}는 등록되지 않은 CODE 입니다.`);
      return insurance;
    } else if (allOrOne === 'ALL') {
      return await selectBuilder.getRawMany();
    }
  }
  async createInsurance(creator: string, createInsuanceDto: CreateInsuranceDto) {
    try {
      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(InsuranceEntity)
        .values([createInsuanceDto])
        .execute();
      this.logger.log(`${creator}님이 ${createInsuanceDto.toString()} 보험사 정보를 등록했습니다.`);
      return { code: createInsuanceDto.code, name: createInsuanceDto.name };
    } catch (e) {
      if (+e.code === _UNIQUE_VIOLATION) {
        throw DuplicateException(`${createInsuanceDto.code}는 이미 사용중인 코드입니다.`);
      }
    }
  }
  async updateInsurance(updater: string, code: string, updateInsuanceDto: UpdateInsuranceDto) {
    const insurance = await this.findInsurance('ONE', { code });

    try {
      await this.dataSource
        .createQueryBuilder()
        .update(InsuranceEntity)
        .set({ updater, ...updateInsuanceDto })
        .where('code = :code', { code })
        .execute();

      this.logger.log(`${updater}님이 ${insurance.code}번 보험사 정보를 수정했습니다.`);
      return { code: code };
    } catch (e) {
      this.logger.error(e);
    }
  }
  async deleteInsurance(updater: string, code: string) {
    await this.dataSource
      .createQueryBuilder()
      .update(InsuranceEntity)
      .set({ updater, isUsed: false })
      .where('id = :id', { code })
      .execute();

    this.logger.log(`${updater}님이 ${code}번 보험사 정보를 삭제했습니다.`);
    return { code };
  }
}
