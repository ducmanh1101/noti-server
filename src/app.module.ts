import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './events/event.module';
import { SubscribersModule } from './subscribers/subscribers.module';
import { TopicsModule } from './topics/topics.module';

@Module({
  imports: [EventModule, SubscribersModule, TopicsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
