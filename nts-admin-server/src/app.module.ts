import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManagerModule } from './manager/manager.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './commons/configs/typeOrm.config';

@Module({
  imports: [TypeOrmModule.forRoot(getTypeOrmConfig()), ManagerModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
