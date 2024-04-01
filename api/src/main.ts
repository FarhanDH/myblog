import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './common/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({ credentials: true, origin: 'http://localhost:3000' });
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  await app
    .listen(config().serverPort)
    .then(() =>
      console.log(`server started 🚀 on port ${config().serverPort}`),
    );
}
bootstrap();
