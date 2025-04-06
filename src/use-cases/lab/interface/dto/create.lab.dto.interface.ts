import { TopicEntity } from 'src/infrastructure/db/entities/topic.entity';

export interface ICreateLabDto {
  title: string;
  description: string;
  guidelineFileUrl: string;
  topic: TopicEntity;
}
