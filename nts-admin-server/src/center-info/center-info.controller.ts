import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CenterInfoService } from './center-info.service';
import { CreateCenterInfoDto } from './dto/create-center-info.dto';
import { UpdateCenterInfoDto } from './dto/update-center-info.dto';

@Controller('center-info')
export class CenterInfoController {
  constructor(private readonly centerInfoService: CenterInfoService) {}

  @Post()
  create(@Body() createCenterInfoDto: CreateCenterInfoDto) {
    return this.centerInfoService.create(createCenterInfoDto);
  }

  @Get()
  findAll() {
    return this.centerInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.centerInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCenterInfoDto: UpdateCenterInfoDto) {
    return this.centerInfoService.update(+id, updateCenterInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.centerInfoService.remove(+id);
  }
}
