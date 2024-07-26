import { forwardRef, Module } from '@nestjs/common';
import { CallHandlerModuleService } from './call-handler-module.service';
import { CallHandlerModuleController } from './call-handler-module.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CallHandlerModuleEntity } from './entities/call-handler-module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CallHandlerModuleEntity]), forwardRef(() => AuthModule)],
  controllers: [CallHandlerModuleController],
  providers: [CallHandlerModuleService],
})
export class CallHandlerModuleModule {}
