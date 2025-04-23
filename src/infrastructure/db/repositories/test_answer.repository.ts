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
    private readonly TestAnswerRepository: Repository<TestAnswerEntity>,
  ) {}

  async createTestAnswer(data: ICreateTestAnswerDto): Promise<ITestAnswerEntity> {
    try {
      const answer = this.TestAnswerRepository.create(data);
      return await this.TestAnswerRepository.save(answer);
    } catch (error) {
      throw error;
    }
  }

  async findAllTestAnswers(): Promise<ITestAnswerEntity[]> {
    try {
      return this.TestAnswerRepository.find({});
    } catch (error) {
      throw new Error('Answers not found');
    }
  }

  async findById(answerId: string): Promise<ITestAnswerEntity> {
    try {
      return this.TestAnswerRepository.findOne({ where: { id: answerId } });
    } catch (error) {
      throw new Error('Answer not found');
    }
  }

  async updateTestAnswer(
    id: string,
    answer: Partial<ITestAnswerEntity>,
  ): Promise<ITestAnswerEntity> {
    try {
      await this.TestAnswerRepository.update(id, answer);
      return this.TestAnswerRepository.findOne({ where: { id } });
    } catch {
      throw new Error('Answer not found');
    }
  }

  async deleteTestAnswer(id: string): Promise<void> {
    try {
      await this.TestAnswerRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
