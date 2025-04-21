import { ITopicEntity } from 'src/entiies/topic/interface/topic.entity.interface'

export interface ILabEntity {
  id?: string;
  title: string;
  description?: string;
  guidelineFileUrl: string;
  submittedAt: Date;
  topicId: string;
}
