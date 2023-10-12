import { Injectable } from '@nestjs/common';
import { SubscriberDto } from './dto/create-subscriber.dto';
import { Novu, PushProviderIdEnum } from '@novu/node';
import { API_KEY, API_KEY_SDK } from 'src/constant';
import axios from 'axios';
const novu = new Novu(API_KEY_SDK);

@Injectable()
export class SubscribersService {
  async create(subscriberDto: SubscriberDto) {
    try {
      console.log(subscriberDto);
      await novu.subscribers.identify(subscriberDto.subscriberId, {
        firstName: subscriberDto.firstName,
        lastName: subscriberDto.lastName,
        email: subscriberDto.email,
        phone: subscriberDto.phone,
      });
    } catch (er: any) {
      console.log(er);
    }
  }
  async getSubscriber(subscriberId: string) {
    try {
      const options = {
        method: 'GET',
        headers: {
          Authorization: API_KEY,
        },
      };
      const res = await axios(
        `https://api.novu.co/v1/subscribers/${subscriberId}`,
        options,
      );
      return res.data;
    } catch (error: any) {}
  }

  async setDeviceToken(subscriberId: string, deviceToken: []) {
    try {
      console.log('subid', subscriberId);
      console.log('device', deviceToken);
      await novu.subscribers.setCredentials(
        subscriberId,
        PushProviderIdEnum.FCM,
        {
          deviceTokens: deviceToken,
        },
      );
    } catch (error: any) {
      console.log(error);
    }
  }
  async remove(subscriberId: string) {
    try {
      await novu.subscribers.delete(subscriberId);
    } catch (er: any) {
      console.log(er);
    }
  }

  async getAllSubscribers() {
    try {
      const options = {
        method: 'GET',
        headers: {
          Authorization: API_KEY,
        },
      };
      const res = await axios(`https://api.novu.co/v1/subscribers`, options);
      return res.data.data;
    } catch (error: any) {}
  }
}
