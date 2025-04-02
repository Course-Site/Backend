import { Inject, Injectable, ForbiddenException } from '@nestjs/common';
import { ITopicService } from '../interface/service/topic.service.interface';
import { ITopicRepository } from '../interface/repository/topic.repository.interface';
import { ITopicEntity } from 'src/entiies/topic/interface/topic.entity.interface';
import { ICreateTopicDto } from '../interface/dto/create.topic.dto.interface';


@Injectable()
export class TopicService implements ITopicService {
  constructor(
    @Inject('topicRepository')
    private readonly topicRepository: ITopicRepository,
  ) {}

  async createTopic(data: ICreateTopicDto): Promise<ITopicEntity> {
    return this.topicRepository.createTopic({
      title: data.title,
      description: data.description,
    });
  }

  async findAllTopics(): Promise<ITopicEntity[]> {
      return await this.topicRepository.findAllTopics();
    }
  
    async findById(id: string): Promise<ITopicEntity> {
      return this.topicRepository.findById(id);
    }
  
    async updateTopic(id: string, topic: Partial<ITopicEntity>): Promise<ITopicEntity>{
      return await this.topicRepository.updateTopic(id, topic);
    }
  
    async deleteTopic(id: string): Promise<void> {
      try {
        return await this.topicRepository.deleteTopic(id);
      } catch (error) {
        throw new Error(error);
      }
    }
}
