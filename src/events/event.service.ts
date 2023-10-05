import { Injectable } from '@nestjs/common';
import { EventDto } from './dto/event.dto';
import { Novu } from '@novu/node';
import { API_KEY, WORKFLOW_TRIGGER_ID } from 'src/constant';

const novu = new Novu(API_KEY);

@Injectable()
export class EventService {
  async create(eventDto: EventDto) {
    try {
      await novu.trigger(WORKFLOW_TRIGGER_ID, {
        to: {
          subscriberId: eventDto.subscriberId,
          // email: eventDto.email,
        },
        payload: {
          title: eventDto.title,
          description: eventDto.description,
        },
      });
    } catch (er: any) {}
  }
}
