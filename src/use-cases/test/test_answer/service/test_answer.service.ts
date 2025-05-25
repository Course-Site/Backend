import { Inject, Injectable } from '@nestjs/common';
import { ITestAnswerEntity } from 'src/entiies/test/test_answer/interface/test_answer.entity.interface';
import { ICreateTestAnswerDto } from '../interface/dto/create.test_answer.dto.interface';
import { ITestAnswerRepository } from '../interface/repository/test_answer.repository.interface';
import { ITestAnswerService } from '../interface/service/test_answer.service.interface';

@Injectable()
export class TestAnswerService implements ITestAnswerService {
  constructor(
    @Inject('testAnswerRepository')
    private readonly testAnswerRepository: ITestAnswerRepository,
  ) {}

  async createTestAnswer(
    data: ICreateTestAnswerDto,
  ): Promise<ITestAnswerEntity> {
    return this.testAnswerRepository.createTestAnswer({
      text: data.text,
      isCorrect: data.isCorrect,
      questionId: data.questionId,
    });
  }

  async findAllTestAnswers(): Promise<ITestAnswerEntity[]> {
    return await this.testAnswerRepository.findAllTestAnswers();
  }

  async findById(id: string): Promise<ITestAnswerEntity> {
    return await this.testAnswerRepository.findById(id);
  }

  async updateTestAnswer(
    id: string,
    answer: Partial<ITestAnswerEntity>,
  ): Promise<ITestAnswerEntity> {
    return await this.testAnswerRepository.updateTestAnswer(id, answer);
  }

  async deleteTestAnswer(id: string): Promise<void> {
    try {
      return await this.testAnswerRepository.deleteTestAnswer(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
