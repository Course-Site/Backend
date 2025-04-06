import { TopicEntity } from 'src/infrastructure/db/entities/topic.entity'
import { ILabEntity } from '../interface/lab.entity.interface';
import { TLabEntity } from '../type/lab.entity.type';

export class LabEntity implements ILabEntity {
  id?: string;
  title: string;
  description?: string;
  guidelineFileUrl: string;
  topic: TopicEntity;

  constructor(data: TLabEntity) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.guidelineFileUrl = data.guidelineFileUrl;
  }
}
