import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateAnswerDto } from 'src/use-cases/test_answer/interface/dto/create.test_answer.dto.interface';
import { IAnswerRepository } from 'src/use-cases/test_answer/interface/repository/test_answer.repository.interface';
import { AnswerEntity } from '../entities/test_answer.entity';
import { Repository } from 'typeorm';
import { IAnswerEntity } from 'src/entiies/answer/interface/answer.entity.interface';

@Injectable()
export class AnswerRepository implements IAnswerRepository {
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
  ) {}

  async createAnswer(data: ICreateAnswerDto): Promise<IAnswerEntity> {
    try {
      const answer = this.answerRepository.create(data);
      return await this.answerRepository.save(answer);
    } catch (error) {
      throw error;
    }
  }

  async findAllAnswers(): Promise<IAnswerEntity[]> {
    try {
      return this.answerRepository.find({});
    } catch (error) {
      throw new Error('Answers not found');
    }
  }

  async findById(answerId: string): Promise<IAnswerEntity> {
    try {
      return this.answerRepository.findOne({ where: { id: answerId } });
    } catch (error) {
      throw new Error('Answer not found');
    }
  }

  async updateAnswer(
    id: string,
    answer: Partial<IAnswerEntity>,
  ): Promise<IAnswerEntity> {
    try {
      await this.answerRepository.update(id, answer);
      return this.answerRepository.findOne({ where: { id } });
    } catch {
      throw new Error('Answer not found');
    }
  }

  async deleteAnswer(id: string): Promise<void> {
    try {
      await this.answerRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
