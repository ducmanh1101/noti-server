import { Injectable } from '@nestjs/common';
import { TopicDto } from './dto/topic.dto';
import { Novu } from '@novu/node';
import { API_KEY } from 'src/constant';

const novu = new Novu(API_KEY);

@Injectable()
export class TopicsService {
  async create(topicDto: TopicDto) {
    try {
      await novu.topics.create({
        key: topicDto.key,
        name: topicDto.name,
      });
    } catch (error: any) {}
  }

  async addSubscribers(subscriberId: string, topicKey: string) {
    try {
      await novu.topics.addSubscribers(topicKey, {
        subscribers: [subscriberId],
      });
    } catch (error: any) {}
  }

  async removeSubscribers(subscriberId: string, topicKey: string) {
    try {
      await novu.topics.addSubscribers(topicKey, {
        subscribers: [subscriberId],
      });
    } catch (error: any) {}
  }
}
