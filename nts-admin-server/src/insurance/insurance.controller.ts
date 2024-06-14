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

  @Get(':code')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '보험사 정보를 조회(보험사코드)',
    description: '보험사 코드를 파라미터로 받아 보험사 정보를 반환함',
  })
  @ApiParam({ name: 'code', description: '보험사 코드', required: true })
  @ApiBearerAuth('access-token')
  async getInsuranceByCode(@Req() req: Request, @Param('code') code: string) {
    this.logger.log(`${req['user'].id}님이 ${code}코드로 보험사 정보를 조회함`);
    return await this.insuranceService.findInsurance('ONE', { code });
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

  @Put(':code')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '보험사 정보 수정',
    description: '보험사 코드를 파라미터로 받고 Body를 받아 보험사 정보를 수정함',
  })
  @ApiParam({ name: 'code', description: '보험사 코드', required: true })
  @ApiBody({ type: UpdateInsuranceDto })
  @ApiBearerAuth('access-token')
  async updateInsurance(
    @Req() req: Request,
    @Param('code') code: string,
    @Body() updateInsuranceDto: UpdateInsuranceDto,
  ) {
    const updater = req['user'].id;
    this.logger.log(`${updater}님이 ${code}번 보험사 정보를 수정함`);
    return await this.insuranceService.updateInsurance(updater, code, updateInsuranceDto);
  }

  @Delete(':code')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '보험사 정보 삭제',
    description: '보험사 코드를 파라미터로 받아 보험사 정보를 삭제함',
  })
  @ApiParam({ name: 'code', description: '보험사 코드', required: true })
  @ApiBearerAuth('access-token')
  async deleteInsurance(@Req() req: Request, @Param('code') code: string) {
    const updater = req['user'].id;
    this.logger.log(`${updater}님이 ${code}번 보험사 정보를 삭제함`);
    return await this.insuranceService.deleteInsurance(updater, code);
  }
}
