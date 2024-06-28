import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto, LoginManagerDto } from './dto/post-manager.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/auth.jwt.guard';
import { UpdateManagerDto } from './dto/put-manager.dto';
import { Request } from 'express';
import { OptionType } from '../commons/types/commons';

@Controller('manager')
@ApiTags('Manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  private logger = new Logger(ManagerController.name);

  @Get('team/:teamType')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '담당자 리스트를 조회(팀구분)',
    description: '팀 구분을 파라미터로 받아 담당자 리스트를 반환함',
  })
  @ApiParam({ name: 'teamType', description: '팀 구분', required: true, enum: ['NTS', 'AM'] })
  @ApiBearerAuth('access-token')
  async getAllManagerByTeamType(@Req() req: Request, @Param('teamType') teamType: string) {
    this.logger.log(`${req['user'].id}님이 ${teamType}팀의 담당자 리스트를 조회함`);
    return await this.managerService.findManager('ALL', { teamType });
  }

  @Get('team/:teamType/:teamId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '담당자 리스트를 조회(팀구분, 팀 ID)',
    description: '팀 구분과 팀 ID를 파라미터로 받아 담당자 리스트를 반환함',
  })
  @ApiParam({ name: 'teamType', description: '팀 구분', required: true, enum: ['NTS', 'AM'] })
  @ApiParam({ name: 'teamId', description: '팀 ID', required: true, type: Number })
  @ApiBearerAuth('access-token')
  async getAllManagerByTeamInfo(
    @Req() req: Request,
    @Param('teamType') teamType: string,
    @Param('teamId') teamId: number,
  ) {
    this.logger.log(`${req['user'].id}님이 ${teamType}${teamId}팀의 담당자 리스트를 조회함`);
    return await this.managerService.findManager('ALL', { teamType, teamId });
  }

  @Get('options/teamMember/:teamType')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '담당자 그룹 멤버를 조회(팀구분)',
    description: '팀 구분을 파라미터로 받아 담당자 그룹 멤버를 반환함',
  })
  @ApiParam({ name: 'teamType', description: '팀 구분', required: true, enum: ['NTS'] })
  @ApiBearerAuth('access-token')
  async getTeamMemberByTeamType(
    @Req() req: Request,
    @Param('teamType') teamType: string,
  ): Promise<OptionType[]> {
    this.logger.log(`${req['user'].id}님이 ${teamType}으로 팀 멤버를 조회함`);
    return await this.managerService.getTeamMemberByTeamType({ teamType });
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '담당자를 조회(ID)',
    description: 'ID를 파라미터로 받아 담당자 정보를 반환함',
  })
  @ApiParam({ name: 'id', description: 'ID', required: true })
  @ApiBearerAuth('access-token')
  async getManager(@Req() req: Request, @Param('id') id: string) {
    this.logger.log(`${req['user'].id}님이 ${id}님의 정보를 조회함`);
    return await this.managerService.findManager('ONE', { id });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '담당자 정보 수정(ID)',
    description: 'ID와 Body를 받아 담당자 정보 수정함',
  })
  @ApiParam({ name: 'id', description: '아이디', required: true })
  @ApiBody({ type: UpdateManagerDto })
  @ApiBearerAuth('access-token')
  async updateManagerAM(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateManagerDto: UpdateManagerDto,
  ) {
    const updater = req['user'].id;
    this.logger.log(`${updater}님이 ${id}님의 정보 수정을 요청함`);
    await this.managerService.updateManager(updater, id, updateManagerDto);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '본인 정보 수정',
    description: 'Body를 받아 본인 정보 수정함',
  })
  @ApiBody({ type: UpdateManagerDto })
  @ApiBearerAuth('access-token')
  async updateManagerNTS(@Req() req: Request, @Body() updateManagerDto: UpdateManagerDto) {
    const id = req['user'].id;
    this.logger.log(`${id}님이 정보 수정을 요청함`);
    await this.managerService.updateManager(id, id, updateManagerDto);
  }

  @Post('signup')
  @ApiOperation({
    summary: '회원가입',
    description: 'Body를 받아 담당자를 등록함',
  })
  @ApiBody({ type: CreateManagerDto })
  async createManager(@Body() createManagerDto: CreateManagerDto) {
    this.logger.log(`${createManagerDto.name}님이 ${createManagerDto.id}로 회원가입 요청함`);
    return await this.managerService.createManager(createManagerDto);
  }

  @Post('login')
  @ApiOperation({
    summary: '로그인',
  })
  @ApiBody({ type: LoginManagerDto })
  async loginManager(@Body() loginManagerDto: LoginManagerDto) {
    this.logger.log(`${loginManagerDto.id}님이 로그인 요청함`);
    return await this.managerService.loginManager(loginManagerDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'NTS 계정 삭제',
  })
  @ApiBearerAuth('access-token')
  async deleteManagerNTS(@Req() req: Request) {
    const id = req['user'].id;
    this.logger.log(`${id}님이 ${id} 담당자 정보를 삭제함`);
    return await this.managerService.deleteManager(id, id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'AM 계정 삭제',
  })
  @ApiParam({ name: 'id', description: '아이디', required: true })
  @ApiBearerAuth('access-token')
  async deleteManagerAM(@Req() req: Request, @Param('id') id: string) {
    const updater = req['user'].id;
    this.logger.log(`${updater}님이 ${id} 담당자 정보를 삭제함`);
    return await this.managerService.deleteManager(updater, id);
  }
}
