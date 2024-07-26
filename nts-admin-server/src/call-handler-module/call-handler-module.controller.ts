import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CallHandlerModuleService } from './call-handler-module.service';
import { CreateCallHandlerModuleDto } from './dto/create-call-handler-module.dto';
import { UpdateCallHandlerModuleDto } from './dto/update-call-handler-module.dto';

@Controller('call-handler-module')
export class CallHandlerModuleController {
  constructor(private readonly callHandlerModuleService: CallHandlerModuleService) {}

  @Post()
  create(@Body() createCallHandlerModuleDto: CreateCallHandlerModuleDto) {
    return this.callHandlerModuleService.create(createCallHandlerModuleDto);
  }

  @Get()
  findAll() {
    return this.callHandlerModuleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.callHandlerModuleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCallHandlerModuleDto: UpdateCallHandlerModuleDto) {
    return this.callHandlerModuleService.update(+id, updateCallHandlerModuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.callHandlerModuleService.remove(+id);
  }
}
