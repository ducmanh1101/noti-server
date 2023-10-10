import { Controller, Post, Body, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { EventDto, EventTopicDto } from './dto/event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() createEventDto: EventDto) {
    return this.eventService.create(createEventDto);
  }

  @Post('topics/:key')
  sendTopicNotification(
    @Param('key') key: string,
    @Body() eventTopicDto: EventTopicDto,
  ) {
    return this.eventService.sendTopicNotification(key, eventTopicDto);
  }
}
