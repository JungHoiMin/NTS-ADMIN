import { forwardRef, Module } from '@nestjs/common';
import { SponsorService } from './sponsor.service';
import { SponsorController } from './sponsor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { SponsorEntity } from './entities/sponsor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SponsorEntity]), forwardRef(() => AuthModule)],
  controllers: [SponsorController],
  providers: [SponsorService],
})
export class SponsorModule {}
