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
import { SponsorService } from './sponsor.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/auth.jwt.guard';
import { Request } from 'express';
import { CreateSponsorDto } from './dto/post-sponsor.dto';
import { UpdateSponsorDto } from './dto/put-sponsor.dto';

@Controller('sponsor')
@ApiTags('Sponsor')
export class SponsorController {
  constructor(private readonly sponsorService: SponsorService) {}

  private logger = new Logger(SponsorController.name);

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '스폰서사 정보 리스트를 조회',
  })
  @ApiBearerAuth('access-token')
  async getAllSponsor(@Req() req: Request) {
    this.logger.log(`${req['user'].id}님이 보험사 리스트를 조회함`);
    return await this.sponsorService.findSponsor('ALL');
  }

  @Get(':idx')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '스폰서사 정보를 조회(스폰서사 코드)',
    description: '스폰서사 코드를 파라미터로 받아 스폰서사 정보를 반환함',
  })
  @ApiParam({ name: 'idx', description: '스폰서사 코드', required: true })
  @ApiBearerAuth('access-token')
  async getSponsorByCode(@Req() req: Request, @Param('idx') idx: string) {
    this.logger.log(`${req['user'].id}님이 ${idx}코드로 보험사 정보를 조회함`);
    return await this.sponsorService.findSponsor('ONE', { idx });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '스폰서사 추가',
  })
  @ApiBody({ type: CreateSponsorDto })
  @ApiBearerAuth('access-token')
  async createSponsor(@Req() req: Request, @Body() createSponsorDto: CreateSponsorDto) {
    const creator = req['user'].id;
    this.logger.log(`${creator}님이 ${createSponsorDto.name} 스폰서사 정보를 등록함`);
    return await this.sponsorService.createSponsor(creator, createSponsorDto);
  }

  @Put(':idx')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '스폰서사 정보 수정',
    description: '스폰서사 코드를 파라미터로 받고 Body를 받아 스폰서사 정보를 수정함',
  })
  @ApiParam({ name: 'idx', description: '스폰서사 코드', required: true })
  @ApiBody({ type: UpdateSponsorDto })
  @ApiBearerAuth('access-token')
  async updateSponsor(
    @Req() req: Request,
    @Param('idx') idx: string,
    @Body() updateSponsorDto: UpdateSponsorDto,
  ) {
    const updater = req['user'].id;
    this.logger.log(`${updater}님이 ${idx}번 스폰서사 정보를 수정함`);
    return await this.sponsorService.updateSponsor(updater, idx, updateSponsorDto);
  }

  @Delete(':idx')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '스폰서사 정보 삭제',
    description: '스폰서사 코드를 파라미터로 받아 스폰서사 정보를 삭제함',
  })
  @ApiParam({ name: 'idx', description: '스폰서사 코드', required: true })
  @ApiBearerAuth('access-token')
  async deleteSponsor(@Req() req: Request, @Param('idx') idx: string) {
    const updater = req['user'].id;
    this.logger.log(`${updater}님이 ${idx}번 스폰서사 정보를 삭제함`);
    return await this.sponsorService.deleteSponsor(updater, idx);
  }
}
