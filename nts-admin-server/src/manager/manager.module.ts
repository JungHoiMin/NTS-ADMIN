import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from './entities/manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerEntity])],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
