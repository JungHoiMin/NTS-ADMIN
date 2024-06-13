import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateManagerDto, LoginManagerDto } from './dto/post-manager.dto';
import { ManagerEntity } from './entities/manager.entity';
import * as bcrypt from 'bcrypt';
import {
  IdDuplicateException,
  ManagerNotFoundException,
  WrongPasswordException,
} from '../commons/exception/service.exception';
import { _UNIQUE_VIOLATION } from '../commons/exception/error-code';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class ManagerService {
  constructor(
    private readonly dataSource: DataSource,

    private readonly authService: AuthService,
  ) {}

  private logger = new Logger(ManagerService.name);

  async findManager(
    allOrOne: 'ALL' | 'ONE',
    options?: { id?: string; teamType?: string; teamId?: number },
  ) {
    const selectBuilder = this.dataSource
      .getRepository(ManagerEntity)
      .createQueryBuilder()
      .select(['id', 'name', '"teamType"', '"teamId"', '"joinDate"'])
      .where('"isUsed" = :isUsed', { isUsed: true });

    if (options !== undefined) {
      if (options.id !== undefined) selectBuilder.andWhere('id = :id', { id: options.id });

      if (options.teamId !== undefined)
        selectBuilder.andWhere('"teamId" = :teamId', { teamId: options.teamId });

      if (options.teamType !== undefined)
        selectBuilder.andWhere('"teamType" = :teamType', { teamType: options.teamType });
    }
    selectBuilder
      .addOrderBy('"joinDate"', 'ASC')
      .addOrderBy('"teamId"', 'ASC')
      .addOrderBy('name', 'ASC');

    if (allOrOne === 'ONE') {
      return await selectBuilder.getRawOne();
    } else if (allOrOne === 'ALL') {
      return await selectBuilder.getRawMany();
    }
  }

  async createManager(createManagerDto: CreateManagerDto) {
    try {
      const { pw, ...data } = createManagerDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(pw, salt);

      await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(ManagerEntity)
        .values([{ pw: hashedPassword, ...data }])
        .execute();
      this.logger.log(`${createManagerDto.id}님이 등록되었습니다.`);
      return { id: createManagerDto.id, name: createManagerDto.name };
    } catch (e) {
      if (+e.code === _UNIQUE_VIOLATION) {
        throw IdDuplicateException(`${createManagerDto.id}는 이미 사용중인 아이디입니다.`);
      }
    }
  }

  async loginManager(loginManagerDto: LoginManagerDto) {
    const manager = await this.dataSource
      .getRepository(ManagerEntity)
      .createQueryBuilder()
      .where('id = :id', { id: loginManagerDto.id })
      .getOne();
    if (manager === null || manager === undefined) {
      throw ManagerNotFoundException(`${loginManagerDto.id}는 등록되지 않은 ID 입니다.`);
    }

    if (!(await bcrypt.compare(loginManagerDto.pw, manager.pw))) {
      throw WrongPasswordException();
    }

    return await this.authService.jwtLogin(loginManagerDto.id);
  }
}
