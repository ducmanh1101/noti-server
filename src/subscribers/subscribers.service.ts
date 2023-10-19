import { Injectable } from '@nestjs/common';
import { SubscriberDto } from './dto/create-subscriber.dto';
import { Novu, PushProviderIdEnum } from '@novu/node';
import axios from 'axios';
import configuration from 'src/config/configuration';

@Injectable()
export class SubscribersService {
  async create(subscriberDto: SubscriberDto) {
    try {
      const novu = new Novu(configuration().novu.apiKeySdk);
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
          Authorization: configuration().novu.apiKey,
        },
      };
      const res = await axios(
        `https://api.novu.co/v1/subscribers/${subscriberId}`,
        options,
      );
      return res.data;
    } catch (error: any) {}
  }

  async setDeviceTokenFCM(subscriberId: string, deviceTokens: []) {
    try {
      const novu = new Novu(configuration().novu.apiKeySdk);
      await novu.subscribers.setCredentials(
        subscriberId,
        PushProviderIdEnum.FCM,
        {
          deviceTokens,
        },
      );
    } catch (error: any) {
      console.log(error);
    }
  }
  async setDeviceTokenExpo(subscriberId: string, deviceTokens: []) {
    try {
      const novu = new Novu(configuration().novu.apiKeySdk);
      await novu.subscribers.setCredentials(
        subscriberId,
        PushProviderIdEnum.EXPO,
        {
          deviceTokens: deviceTokens,
        },
      );
    } catch (error: any) {
      console.log(error);
    }
  }

  async remove(subscriberId: string) {
    try {
      const novu = new Novu(configuration().novu.apiKeySdk);
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
          Authorization: configuration().novu.apiKey,
        },
      };
      const res = await axios(`https://api.novu.co/v1/subscribers`, options);
      return res.data.data;
    } catch (error: any) {}
  }
}
