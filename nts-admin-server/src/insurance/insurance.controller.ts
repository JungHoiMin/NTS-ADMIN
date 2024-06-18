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
import { InsuranceService } from './insurance.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/auth.jwt.guard';
import { CreateInsuranceDto } from './dto/post-insurance.dto';
import { UpdateInsuranceDto } from './dto/put-insurance.dto';
import { Request } from 'express';

@Controller('insurance')
@ApiTags('Insurance')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  private logger = new Logger(InsuranceController.name);

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '보험사 정보 리스트를 조회',
  })
  @ApiBearerAuth('access-token')
  async getAllInsurance(@Req() req: Request) {
    this.logger.log(`${req['user'].id}님이 보험사 리스트를 조회함`);
    return await this.insuranceService.findInsurance('ALL');
  }

  @Get(':idx')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '보험사 정보를 조회(보험사코드)',
    description: '보험사 코드를 파라미터로 받아 보험사 정보를 반환함',
  })
  @ApiParam({ name: 'idx', description: '보험사 키 값', required: true })
  @ApiBearerAuth('access-token')
  async getInsuranceByCode(@Req() req: Request, @Param('idx') idx: number) {
    this.logger.log(`${req['user'].id}님이 ${idx}키 값으로 보험사 정보를 조회함`);
    return await this.insuranceService.findInsurance('ONE', { idx });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '보험사 추가',
  })
  @ApiBody({ type: CreateInsuranceDto })
  @ApiBearerAuth('access-token')
  async createInsurance(@Req() req: Request, @Body() createInsuranceDto: CreateInsuranceDto) {
    const creator = req['user'].id;
    this.logger.log(
      `${creator}님이 ${createInsuranceDto.name}(${createInsuranceDto.code}) 보험사 정보를 등록함`,
    );
    return await this.insuranceService.createInsurance(creator, createInsuranceDto);
  }

  @Put(':idx')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '보험사 정보 수정',
    description: '보험사 코드를 파라미터로 받고 Body를 받아 보험사 정보를 수정함',
  })
  @ApiParam({ name: 'idx', description: '보험사 키 값', required: true })
  @ApiBody({ type: UpdateInsuranceDto })
  @ApiBearerAuth('access-token')
  async updateInsurance(
    @Req() req: Request,
    @Param('idx') idx: number,
    @Body() updateInsuranceDto: UpdateInsuranceDto,
  ) {
    const updater = req['user'].id;
    this.logger.log(`${updater}님이 ${idx}번 보험사 정보를 수정함`);
    return await this.insuranceService.updateInsurance(updater, idx, updateInsuranceDto);
  }

  @Delete(':idx')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '보험사 정보 삭제',
    description: '보험사 코드를 파라미터로 받아 보험사 정보를 삭제함',
  })
  @ApiParam({ name: 'idx', description: '보험사 키 값', required: true })
  @ApiBearerAuth('access-token')
  async deleteInsurance(@Req() req: Request, @Param('idx') idx: number) {
    const updater = req['user'].id;
    this.logger.log(`${updater}님이 ${idx}번 보험사 정보를 삭제함`);
    return await this.insuranceService.deleteInsurance(updater, idx);
  }
}
