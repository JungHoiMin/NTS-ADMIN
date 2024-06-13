import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateManagerDto, LoginManagerDto } from './dto/post-manager.dto';
import { ManagerEntity } from './entities/manager.entity';
import * as bcrypt from 'bcrypt';
import { IdDuplicateException } from '../commons/exception/service.exception';
import { _UNIQUE_VIOLATION } from '../commons/exception/error-code';
@Injectable()
export class ManagerService {
  constructor(private readonly dataSource: DataSource) {}

  private logger = new Logger(ManagerService.name);

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

  async loginManager(loginManagerDto: LoginManagerDto) {}
}
