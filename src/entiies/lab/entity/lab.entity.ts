import { TopicEntity } from 'src/infrastructure/db/entities/topic.entity';
import { ILabEntity } from '../interface/lab.entity.interface';
import { TLabEntity } from '../type/lab.entity.type';
import { ITopicEntity } from 'src/entiies/topic/interface/topic.entity.interface'

export class LabEntity implements ILabEntity {
  id?: string;
  title: string;
  description?: string;
  guidelineFileUrl: string;
  submittedAt: Date;
  topicId: string;

  constructor(data: TLabEntity) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.guidelineFileUrl = data.guidelineFileUrl;
    this.submittedAt = data.submittedAt;
    this.topicId = data.topicId;
  }
}
