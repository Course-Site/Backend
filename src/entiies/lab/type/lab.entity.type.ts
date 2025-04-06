import { TopicEntity } from 'src/infrastructure/db/entities/topic.entity';

export type TLabEntity = {
  id?: string;
  title: string;
  description?: string;
  guidelineFileUrl: string;
  topic: TopicEntity;
};
