import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ITopicEntity } from 'src/entiies/topic/interface/topic.entity.interface';
import { ICreateTopicDto } from 'src/use-cases/topic/interface/dto/create.topic.dto.interface';
import { ITopicRepository } from 'src/use-cases/topic/interface/repository/topic.repository.interface';
import { Repository } from 'typeorm';
import { TopicEntity } from '../entities/topic.entity';

@Injectable()
export class TopicRepository implements ITopicRepository {
  constructor(
    @InjectRepository(TopicEntity)
    private readonly topicRepository: Repository<TopicEntity>,
  ) {}

  async createTopic(data: ICreateTopicDto): Promise<ITopicEntity> {
    try {
      const topic = this.topicRepository.create(data);
      return await this.topicRepository.save(topic);
    } catch (error) {
      throw error;
    }
  }

  async findAllTopics(): Promise<ITopicEntity[]> {
    try {
      return this.topicRepository.find({});
    } catch (error) {
      throw new Error('Topics not found');
    }
  }

  async findById(topicId: string): Promise<ITopicEntity> {
    try {
      return this.topicRepository.findOne({ where: { id: topicId } });
    } catch (error) {
      throw new Error('Topic not found');
    }
  }

  async updateTopic(
    id: string,
    topic: Partial<ITopicEntity>,
  ): Promise<ITopicEntity> {
    try {
      await this.topicRepository.update(id, topic);
      return this.topicRepository.findOne({ where: { id } });
    } catch {
      throw new Error('Topic not found');
    }
  }

  async deleteTopic(id: string): Promise<void> {
    try {
      await this.topicRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
