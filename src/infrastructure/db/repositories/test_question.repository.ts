import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateQuestionDto } from 'src/use-cases/test_question/interface/dto/create.test_question.dto.interface';
import { ITestQuestionRepository } from 'src/use-cases/test_question/interface/repository/test_question.repository.interface';
import { QuestionEntity } from '../entities/test_question.entity';
import { Repository } from 'typeorm';
import { ITestQuestionEntity } from 'src/entiies/test_question/interface/test_question.entity.interface';

@Injectable()
export class QuestionRepository implements ITestQuestionRepository {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}

  async createQuestion(data: ICreateQuestionDto): Promise<ITestQuestionEntity> {
    try {
      const question = this.questionRepository.create(data);
      return await this.questionRepository.save(question);
    } catch (error) {
      throw error;
    }
  }

  async findAllQuestions(): Promise<ITestQuestionEntity[]> {
    try {
      return this.questionRepository.find({});
    } catch (error) {
      throw new Error('Questions not found');
    }
  }

  async findById(questionId: string): Promise<ITestQuestionEntity> {
    try {
      return this.questionRepository.findOne({ where: { id: questionId } });
    } catch (error) {
      throw new Error('Question not found');
    }
  }

  async updateQuestion(
    id: string,
    question: Partial<ITestQuestionEntity>,
  ): Promise<ITestQuestionEntity> {
    try {
      await this.questionRepository.update(id, question);
      return this.questionRepository.findOne({ where: { id } });
    } catch {
      throw new Error('Question not found');
    }
  }

  async deleteQuestion(id: string): Promise<void> {
    try {
      await this.questionRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
