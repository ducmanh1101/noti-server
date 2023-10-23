import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventModule } from './events/event.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { TopicsModule } from './topics/topics.module';

import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    EventModule,
    SubscribersModule,
    TopicsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
