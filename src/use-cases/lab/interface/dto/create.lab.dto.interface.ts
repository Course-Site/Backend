import { ITopicEntity } from 'src/entiies/topic/interface/topic.entity.interface'
import { TopicEntity } from 'src/infrastructure/db/entities/topic.entity';

export interface ICreateLabDto {
  title: string;
  content: string;
  topicId: string;
  maxScore: number;
}
