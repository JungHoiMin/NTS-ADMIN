import { forwardRef, Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from './entities/manager.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerEntity]), forwardRef(() => AuthModule)],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
