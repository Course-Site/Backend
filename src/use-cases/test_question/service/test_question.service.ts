import { Inject, Injectable } from '@nestjs/common';
import { IQuestionService } from '../interface/service/test_question.service.interface';
import { ITestQuestionRepository } from '../interface/repository/test_question.repository.interface';
import { ITestQuestionEntity } from 'src/entiies/test_question/interface/test_question.entity.interface';
import { ICreateQuestionDto } from '../interface/dto/create.test_question.dto.interface';

@Injectable()
export class QuestionService implements IQuestionService {
  constructor(
    @Inject('questionRepository')
    private readonly questionRepository: ITestQuestionRepository,
  ) {}

  async createQuestion(data: ICreateQuestionDto): Promise<ITestQuestionEntity> {
    return this.questionRepository.createQuestion({
      text: data.text,
      imageUrl: data.imageUrl,
      number: data.number,
      testId: data.testId,
    });
  }

  async findAllQuestions(): Promise<ITestQuestionEntity[]> {
    return await this.questionRepository.findAllQuestions();
  }

  async findById(id: string): Promise<ITestQuestionEntity> {
    return await this.questionRepository.findById(id);
  }

  async updateQuestion(
    id: string,
    question: Partial<ITestQuestionEntity>,
  ): Promise<ITestQuestionEntity> {
    return await this.questionRepository.updateQuestion(id, question);
  }

  async deleteQuestion(id: string): Promise<void> {
    try {
      return await this.questionRepository.deleteQuestion(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
