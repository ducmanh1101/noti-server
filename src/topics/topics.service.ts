import { Injectable } from '@nestjs/common';
import { TopicDto } from './dto/topic.dto';
import { Novu } from '@novu/node';
import axios from 'axios';
import configuration from 'src/config/configuration';

@Injectable()
export class TopicsService {
  async createTopic(topicDto: TopicDto) {
    try {
      const novu = new Novu(configuration().novu.apiKeySdk);
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
          Authorization: configuration().novu.apiKey,
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
          Authorization: configuration().novu.apiKey,
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
          Authorization: configuration().novu.apiKey,
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

  async removeSubscribers(topicKey: string, subscriberId: string) {
    try {
      const novu = new Novu(configuration().novu.apiKeySdk);
      await novu.topics.removeSubscribers(topicKey, {
        subscribers: [subscriberId],
      });
    } catch (error: any) {}
  }

  async deleteTopic(topicKey: string) {
    try {
      await axios.delete(`https://api.novu.co/v1/topics/${topicKey}`, {
        headers: {
          Authorization: configuration().novu.apiKey,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
