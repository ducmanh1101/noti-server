import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  Put,
} from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscriberDto } from './dto/create-subscriber.dto';

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

  @Put('/fcm/:subscriberId')
  updateFcmDeviceToken(
    @Param('subscriberId') subscriberId: string,
    @Body('deviceTokens') deviceTokens: [],
  ) {
    return this.subscribersService.setDeviceTokenFCM(
      subscriberId,
      deviceTokens,
    );
  }
  @Put('/expo/:subscriberId')
  updateExpoDeviceToken(
    @Param('subscriberId') subscriberId: string,
    @Body('deviceTokens') deviceTokens: [],
  ) {
    return this.subscribersService.setDeviceTokenExpo(
      subscriberId,
      deviceTokens,
    );
  }

  @Delete(':subscriberId')
  remove(@Param('subscriberId') subscriberId: string) {
    return this.subscribersService.remove(subscriberId);
  }
}
