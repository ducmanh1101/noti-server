import { Controller, Post, Body } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicDto } from './dto/topic.dto';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  create(@Body() topicDto: TopicDto) {
    return this.topicsService.create(topicDto);
  }
}
