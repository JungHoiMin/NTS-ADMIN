import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ManagerEntity } from '../manager/entities/manager.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: 'SECRET',
      signOptions: { expiresIn: '1y' },
    }),
    forwardRef(() => ManagerEntity),
  ],
  providers: [AuthService],
  exports: [AuthModule, AuthService],
})
export class AuthModule {}
