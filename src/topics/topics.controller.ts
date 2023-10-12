import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicDto } from './dto/topic.dto';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  getAllTopics() {
    return this.topicsService.getAllTopic();
  }

  @Get(':topicKey')
  getTopic(@Param('topicKey') topicKey: string) {
    return this.topicsService.getTopic(topicKey);
  }

  @Post()
  createTopic(@Body() topicDto: TopicDto) {
    return this.topicsService.createTopic(topicDto);
  }

  @Post('/add/:topicKey')
  addSub(
    @Param('topicKey') topicKey: string,
    @Body('subscribers') subscribers: string,
  ) {
    return this.topicsService.addSubscribers(topicKey, subscribers);
  }
}
