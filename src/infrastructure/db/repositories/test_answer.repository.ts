import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateTestAnswerDto } from 'src/use-cases/test_answer/interface/dto/create.test_answer.dto.interface';
import { ITestAnswerRepository } from 'src/use-cases/test_answer/interface/repository/test_answer.repository.interface';
import { TestAnswerEntity } from '../entities/test_answer.entity';
import { Repository } from 'typeorm';
import { ITestAnswerEntity } from 'src/entiies/test_answer/interface/test_answer.entity.interface';

@Injectable()
export class TestAnswerRepository implements ITestAnswerRepository {
  constructor(
    @InjectRepository(TestAnswerEntity)
    private readonly testAnswerRepository: Repository<TestAnswerEntity>,
  ) {}

  async createAnswer(data: ICreateTestAnswerDto): Promise<ITestAnswerEntity> {
    try {
      const answer = this.testAnswerRepository.create(data);
      return await this.testAnswerRepository.save(answer);
    } catch (error) {
      throw error;
    }
  }

  async findAllAnswers(): Promise<ITestAnswerEntity[]> {
    try {
      return this.testAnswerRepository.find({});
    } catch (error) {
      throw new Error('Answers not found');
    }
  }

  async findById(answerId: string): Promise<ITestAnswerEntity> {
    try {
      return this.testAnswerRepository.findOne({ where: { id: answerId } });
    } catch (error) {
      throw new Error('Answer not found');
    }
  }

  async updateAnswer(
    id: string,
    answer: Partial<ITestAnswerEntity>,
  ): Promise<ITestAnswerEntity> {
    try {
      await this.testAnswerRepository.update(id, answer);
      return this.testAnswerRepository.findOne({ where: { id } });
    } catch {
      throw new Error('Answer not found');
    }
  }

  async deleteAnswer(id: string): Promise<void> {
    try {
      await this.testAnswerRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
