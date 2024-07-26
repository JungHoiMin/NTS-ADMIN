import { Injectable } from '@nestjs/common';
import { CreateCenterInfoDto } from './dto/create-center-info.dto';
import { UpdateCenterInfoDto } from './dto/update-center-info.dto';

@Injectable()
export class CenterInfoService {
  create(createCenterInfoDto: CreateCenterInfoDto) {
    return 'This action adds a new centerInfo';
  }

  findAll() {
    return `This action returns all centerInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} centerInfo`;
  }

  update(id: number, updateCenterInfoDto: UpdateCenterInfoDto) {
    return `This action updates a #${id} centerInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} centerInfo`;
  }
}
