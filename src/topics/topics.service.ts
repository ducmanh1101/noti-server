import { Injectable } from '@nestjs/common';
import { TopicDto } from './dto/topic.dto';
import { Novu } from '@novu/node';
import { API_KEY, API_KEY_SDK } from 'src/constant';
import axios from 'axios';

const novu = new Novu(API_KEY_SDK);

@Injectable()
export class TopicsService {
  async createTopic(topicDto: TopicDto) {
    try {
      await novu.topics.create({
        key: topicDto.key,
        name: topicDto.name,
      });
    } catch (error: any) {
      console.log(error);
    }
  }

  async getTopic(topicKey: string) {
    try {
      const res = await axios.get(`https://api.novu.co/v1/topics/${topicKey}`, {
        headers: {
          Authorization: API_KEY,
        },
      });
      return res.data.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getAllTopic() {
    try {
      const response = await axios.get(`https://api.novu.co/v1/topics`, {
        headers: {
          Authorization: API_KEY,
        },
      });
      return response.data.data;
    } catch (error) {}
  }

  async addSubscribers(topicKey: string, subscribers: string) {
    try {
      const options = {
        method: 'POST',
        url: `https://api.novu.co/v1/topics/${topicKey}/subscribers`,
        headers: {
          Authorization: API_KEY,
          'Content-Type': 'application/json',
        },
        data: {
          subscribers: [subscribers],
        },
      };
      await axios(options);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async removeSubscribers(subscriberId: string, topicKey: string) {
    try {
      await novu.topics.removeSubscribers(topicKey, {
        subscribers: [subscriberId],
      });
    } catch (error: any) {}
  }
}
