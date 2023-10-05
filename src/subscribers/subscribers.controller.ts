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
  findAll(page: number, limit: number) {
    return this.subscribersService.findAll(page, limit);
  }

  @Post()
  create(@Body() createSubscriberDto: SubscriberDto) {
    return this.subscribersService.create(createSubscriberDto);
  }

  @Put()
  update(subscriberId: string, deviceTokens: []) {
    return this.subscribersService.setDeviceToken(subscriberId, deviceTokens);
  }

  @Delete(':subscriberId')
  remove(@Param('subscriberId') subscriberId: string) {
    return this.subscribersService.remove(subscriberId);
  }
}
