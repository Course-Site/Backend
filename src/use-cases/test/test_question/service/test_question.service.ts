import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ITestQuestionEntity } from 'src/entiies/test/test_question/interface/test_question.entity.interface';
import { ICreateTestQuestionDto } from '../interface/dto/create.test_question.dto.interface';
import { ITestQuestionRepository } from '../interface/repository/test_question.repository.interface';
import { ITestQuestionService } from '../interface/service/test_question.service.interface';

@Injectable()
export class TestQuestionService implements ITestQuestionService {
  constructor(
    @Inject('testQuestionRepository')
    private readonly testQuestionRepository: ITestQuestionRepository,
  ) {}

  async createTestQuestion(
    data: ICreateTestQuestionDto,
  ): Promise<ITestQuestionEntity> {
    return this.testQuestionRepository.createTestQuestion({
      text: data.text,
      number: data.number,
      testId: data.testId,
      score: data.score,
    });
  }

  async createManyTestQuestions(data: ICreateTestQuestionDto[]) {
    const testIds = new Set(data.map((q) => q.testId));
    if (testIds.size > 1) {
      throw new BadRequestException(
        'All questions must belong to the same test',
      );
    }

    return this.testQuestionRepository.createManyTestQuestions(data);
  }

  async findAllTestQuestions(): Promise<ITestQuestionEntity[]> {
    return await this.testQuestionRepository.findAllTestQuestions();
  }

  async findById(id: string): Promise<ITestQuestionEntity> {
    return await this.testQuestionRepository.findById(id);
  }

  async updateTestQuestion(
    id: string,
    question: Partial<ITestQuestionEntity>,
  ): Promise<ITestQuestionEntity> {
    return await this.testQuestionRepository.updateTestQuestion(id, question);
  }

  async deleteTestQuestion(id: string): Promise<void> {
    try {
      return await this.testQuestionRepository.deleteTestQuestion(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
