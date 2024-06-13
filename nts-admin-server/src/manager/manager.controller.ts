import { Body, Controller, Get, HttpException, HttpStatus, Logger, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ManagerService } from './manager.service';
import { CreateManagerDto, LoginManagerDto, UpdateManagerDto } from './dto/post-manager.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/auth.jwt.guard';

@Controller('manager')
@ApiTags('Manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  private logger = new Logger(ManagerController.name);

  @Get('team/:teamType/all')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '담당자 리스트를 조회(팀구분)',
    description: '팀 구분을 파라미터로 받아 담당자 리스트를 반환함',
  })
  @ApiParam({ name: 'teamType', description: '팀 구분', required: true })
  getAllManagerByTeamType(@Param('teamType') teamType: string) {}

  @Get('team/:teamType/:teamId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '담당자 리스트를 조회(팀구분, 팀 ID)',
    description: '팀 구분과 팀 ID를 파라미터로 받아 담당자 리스트를 반환함',
  })
  @ApiParam({ name: 'teamType', description: '팀 구분', required: true })
  @ApiParam({ name: 'teamId', description: '팀 ID', required: true, type: Number })
  getAllManagerByTeamInfo(@Param('teamType') teamType: string, @Param('teamId') teamId: string) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '담당자를 조회(ID)',
    description: 'ID를 파라미터로 받아 담당자 정보를 반환함',
  })
  @ApiParam({ name: 'teamType', description: '팀 구분', required: true })
  getManager(@Param('id') id: string) {}

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '담당자 정보 수정(ID)',
    description: 'ID와 Body를 받아 담당자 정보 수정함',
  })
  @ApiParam({ name: 'id', description: '아이디', required: true })
  @ApiBody({ type: UpdateManagerDto })
  updateManager(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    console.log({
      id,
      ...updateManagerDto,
    });
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
    return await this.managerService.loginManager(loginManagerDto);
  }
}
