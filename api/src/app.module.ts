import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommonModule } from './common/common.module';
import { UsersModule } from './core/users/users.module';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [CommonModule, UsersModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
