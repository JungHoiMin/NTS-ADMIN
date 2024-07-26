import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManagerModule } from './manager/manager.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getTypeOrmConfig } from './commons/configs/typeOrm.config';
import { InsuranceModule } from './insurance/insurance.module';
import { SponsorModule } from './sponsor/sponsor.module';
import { CenterInfoModule } from './center-info/center-info.module';
import { CallHandlerModuleModule } from './call-handler-module/call-handler-module.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    ManagerModule,
    AuthModule,
    InsuranceModule,
    SponsorModule,
    CenterInfoModule,
    CallHandlerModuleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
