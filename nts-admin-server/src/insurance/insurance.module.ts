import { forwardRef, Module } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { InsuranceController } from './insurance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsuranceEntity } from './entities/insurance.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([InsuranceEntity]), forwardRef(() => AuthModule)],
  controllers: [InsuranceController],
  providers: [InsuranceService],
})
export class InsuranceModule {}
