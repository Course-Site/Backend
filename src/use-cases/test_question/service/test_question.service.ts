import { Inject, Injectable } from '@nestjs/common';
import { IQuestionService } from '../interface/service/test_question.service.interface';
import { IQuestionRepository } from '../interface/repository/test_question.repository.interface';
import { IQuestionEntity } from 'src/entiies/question/interface/question.entity.interface';
import { ICreateQuestionDto } from '../interface/dto/create.test_question.dto.interface';

@Injectable()
export class QuestionService implements IQuestionService {
  constructor(
    @Inject('questionRepository')
    private readonly questionRepository: IQuestionRepository,
  ) {}

  async createQuestion(data: ICreateQuestionDto): Promise<IQuestionEntity> {

    return this.questionRepository.createQuestion({
	  text: data.text,
    imageUrl: data.imageUrl,
    });
  }

  async findAllQuestions(): Promise<IQuestionEntity[]> {
    return await this.questionRepository.findAllQuestions();
  }

  async findById(id: string): Promise<IQuestionEntity> {
    return await this.questionRepository.findById(id);
  }

  async updateQuestion(id: string, question: Partial<IQuestionEntity>): Promise<IQuestionEntity>{
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