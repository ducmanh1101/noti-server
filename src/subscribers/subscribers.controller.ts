import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Get,
} from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscriberDto } from './dto/create-subscriber.dto';
// import { UpdateSubscriberDto } from './dto/update-subscriber.dto';

@Controller('subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Get()
  getAllSubs() {
    return this.subscribersService.getAllSubscribers();
  }

  @Get(':subscriberId')
  getSubscriber(@Param('subscriberId') subscriberId: string) {
    return this.subscribersService.getSubscriber(subscriberId);
  }

  @Post()
  create(@Body() createSubscriberDto: SubscriberDto) {
    return this.subscribersService.create(createSubscriberDto);
  }

  @Put(':subscriberId')
  update(
    @Param('subscriberId') subscriberId: string,
    @Body('deviceTokens') deviceToken: [],
  ) {
    return this.subscribersService.setDeviceToken(subscriberId, deviceToken);
  }

  @Delete(':subscriberId')
  remove(@Param('subscriberId') subscriberId: string) {
    return this.subscribersService.remove(subscriberId);
  }
}
