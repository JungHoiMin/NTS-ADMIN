import { Injectable } from '@nestjs/common';
import { CreateCallHandlerModuleDto } from './dto/create-call-handler-module.dto';
import { UpdateCallHandlerModuleDto } from './dto/update-call-handler-module.dto';

@Injectable()
export class CallHandlerModuleService {
  create(createCallHandlerModuleDto: CreateCallHandlerModuleDto) {
    return 'This action adds a new callHandlerModule';
  }

  findAll() {
    return `This action returns all callHandlerModule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} callHandlerModule`;
  }

  update(id: number, updateCallHandlerModuleDto: UpdateCallHandlerModuleDto) {
    return `This action updates a #${id} callHandlerModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} callHandlerModule`;
  }
}
