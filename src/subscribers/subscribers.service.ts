import { Injectable } from '@nestjs/common';
import { SubscriberDto } from './dto/create-subscriber.dto';
import { Novu, PushProviderIdEnum } from '@novu/node';
import { API_KEY } from 'src/constant';

const novu = new Novu(API_KEY);

@Injectable()
export class SubscribersService {
  async create(subscriberDto: SubscriberDto) {
    try {
      await novu.subscribers.identify(subscriberDto.subscriberId, {
        firstName: subscriberDto.firstName,
        lastName: subscriberDto.lastName,
        email: subscriberDto.email,
        phone: subscriberDto.phone,
      });
    } catch (er: any) {}
  }
  async setDeviceToken(subscriberId: string, deviceTokens: []) {
    try {
      await novu.subscribers.setCredentials(
        subscriberId,
        PushProviderIdEnum.FCM,
        {
          deviceTokens: deviceTokens,
        },
      );
    } catch (error: any) {}
  }
  async remove(subscriberId: string) {
    try {
      await novu.subscribers.delete(subscriberId);
    } catch (er: any) {}
  }

  async findAll() {
    try {
      await novu.subscribers.list();
    } catch (error: any) {}
  }
}
