import { TopicEntity } from 'src/infrastructure/db/entities/topic.entity';

export type TLabEntity = {
  id?: string;
  title: string;
  description?: string;
  content: string;
  submittedAt: Date;
  topicId: string;
  maxScore: number;
};
