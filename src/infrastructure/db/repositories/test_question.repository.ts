import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ITestQuestionEntity } from 'src/entiies/test/test_question/interface/test_question.entity.interface';
import { ICreateTestQuestionDto } from 'src/use-cases/test/test_question/interface/dto/create.test_question.dto.interface';
import { ITestQuestionRepository } from 'src/use-cases/test/test_question/interface/repository/test_question.repository.interface';
import { Repository } from 'typeorm';
import { TestQuestionEntity } from '../entities/test_question.entity';

@Injectable()
export class TestQuestionRepository implements ITestQuestionRepository {
  constructor(
    @InjectRepository(TestQuestionEntity)
    private readonly TestQuestionRepository: Repository<TestQuestionEntity>,
  ) {}

  async createTestQuestion(
    data: ICreateTestQuestionDto,
  ): Promise<ITestQuestionEntity> {
    try {
      const question = this.TestQuestionRepository.create(data);
      return await this.TestQuestionRepository.save(question);
    } catch (error) {
      throw error;
    }
  }

  async createManyTestQuestions(
    data: ICreateTestQuestionDto[],
  ): Promise<TestQuestionEntity[]> {
    const questions = data.map((item) =>
      this.TestQuestionRepository.create(item),
    );
    return this.TestQuestionRepository.save(questions);
  }

  async findAllTestQuestions(): Promise<ITestQuestionEntity[]> {
    try {
      return this.TestQuestionRepository.find({});
    } catch (error) {
      throw new Error('Questions not found');
    }
  }

  async findById(questionId: string): Promise<ITestQuestionEntity> {
    try {
      return this.TestQuestionRepository.findOne({
        where: { id: questionId },
      });
    } catch (error) {
      throw new Error('Question not found');
    }
  }

  async updateTestQuestion(
    id: string,
    question: Partial<ITestQuestionEntity>,
  ): Promise<ITestQuestionEntity> {
    try {
      await this.TestQuestionRepository.update(id, question);
      return this.TestQuestionRepository.findOne({ where: { id } });
    } catch {
      throw new Error('Question not found');
    }
  }

  async deleteTestQuestion(id: string): Promise<void> {
    try {
      await this.TestQuestionRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
