import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppLoggerMiddleware } from './logger.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    MongooseModule.forRoot(config().dbUrl, {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('MongoDB is connected');
        });
        connection._events.connected();
        return connection;
      },
    }),
  ],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
