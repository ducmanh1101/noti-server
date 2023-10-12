import { Injectable } from '@nestjs/common';
import { EventDto, EventTopicDto } from './dto/event.dto';
import { Novu, TriggerRecipientsTypeEnum } from '@novu/node';
import { API_KEY_SDK, WORKFLOW_TRIGGER_ID } from 'src/constant';

const novu = new Novu(API_KEY_SDK);

@Injectable()
export class EventService {
  async create(eventDto: EventDto) {
    try {
      console.log(eventDto);
      await novu.trigger(WORKFLOW_TRIGGER_ID, {
        to: {
          subscriberId: eventDto.subscriberId,
        },
        payload: {
          title: eventDto.title,
          description: eventDto.description,
        },
      });
    } catch (er: any) {
      console.log(er);
    }
  }

  async sendTopicNotification(key: string, eventTopicDto: EventTopicDto) {
    const result = await novu.trigger(WORKFLOW_TRIGGER_ID, {
      to: [{ type: TriggerRecipientsTypeEnum.TOPIC, topicKey: key }],
      payload: {
        title: eventTopicDto.title,
        description: eventTopicDto.description,
      },
    });

    return result.data;
  }
}
