import { ITopicEntity } from '../interface/topic.entity.interface';
import { TTopicEntity } from '../type/topic.entity.type';

export class TopicEntity implements ITopicEntity {
  id?: string;
  title: string;
  description?: string;

  constructor(data: TTopicEntity) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
  }
}
