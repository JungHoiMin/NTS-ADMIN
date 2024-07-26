import { forwardRef, Module } from '@nestjs/common';
import { CenterInfoService } from './center-info.service';
import { CenterInfoController } from './center-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CenterInfoEntity } from './entities/center-info.entity';
import { InsuranceInfoEntity } from './entities/insurance-info.entity';
import { OnnaraInfoEntity } from './entities/onnara-info.entity';
import { SslvpnServerInfoEntity } from './entities/sslvpn-server-info.entity';
import { DbServerInfoEntity } from './entities/db-server-info.entity';
import { AppServerInfoEntity } from './entities/app-server-info.entity';
import { DbInfoEntity } from './entities/db-info.entity';
import { DateInfoEntity } from './entities/date-info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CenterInfoEntity,
      InsuranceInfoEntity,
      OnnaraInfoEntity,
      SslvpnServerInfoEntity,
      DbServerInfoEntity,
      AppServerInfoEntity,
      DbInfoEntity,
      DateInfoEntity,
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CenterInfoController],
  providers: [CenterInfoService],
})
export class CenterInfoModule {}
