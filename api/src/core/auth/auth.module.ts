import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from '~/common/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: config().jwtSecret,
      signOptions: { expiresIn: '5h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
