import { ITopicEntity } from 'src/entiies/topic/interface/topic.entity.interface';
import { ICreateTopicDto } from '../dto/create.topic.dto.interface';

export interface ITopicRepository {
  createTopic(data: ICreateTopicDto): Promise<ITopicEntity>;
  findAllTopics(): Promise<ITopicEntity[]>;
  findById(id: string): Promise<ITopicEntity>;
  updateTopic(id: string, topic: Partial<ITopicEntity>): Promise<ITopicEntity>;
  deleteTopic(id: string): Promise<void>;
}
