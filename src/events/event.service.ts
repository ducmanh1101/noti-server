import { Injectable } from '@nestjs/common';
import { EventDto, EventTopicDto } from './dto/event.dto';
import { Novu, TriggerRecipientsTypeEnum } from '@novu/node';

import configuration from 'src/config/configuration';

@Injectable()
export class EventService {
  async sendToSubscriber(eventDto: EventDto) {
    try {
      const novu = new Novu(configuration().novu.apiKeySdk);
      await novu.trigger(configuration().novu.workflowId, {
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
    const novu = new Novu(configuration().novu.apiKeySdk);
    const result = await novu.trigger(configuration().novu.workflowId, {
      to: [{ type: TriggerRecipientsTypeEnum.TOPIC, topicKey: key }],
      payload: {
        title: eventTopicDto.title,
        description: eventTopicDto.description,
      },
    });

    return result.data;
  }
}
