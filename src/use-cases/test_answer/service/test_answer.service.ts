import { Inject, Injectable } from '@nestjs/common';
import { ITestAnswerService } from '../interface/service/test_answer.service.interface';
import { ITestAnswerRepository } from '../interface/repository/test_answer.repository.interface';
import { ITestAnswerEntity } from 'src/entiies/test_answer/interface/test_answer.entity.interface';
import { ICreateTestAnswerDto } from '../interface/dto/create.test_answer.dto.interface';

@Injectable()
export class TestAnswerService implements ITestAnswerService {
  constructor(
    @Inject('answerRepository')
    private readonly answerRepository: ITestAnswerRepository,
  ) {}

  async createAnswer(data: ICreateTestAnswerDto): Promise<ITestAnswerEntity> {
    return this.answerRepository.createAnswer({
      text: data.text,
      isCorrect: data.isCorrect,
    });
  }

  async findAllAnswers(): Promise<ITestAnswerEntity[]> {
    return await this.answerRepository.findAllAnswers();
  }

  async findById(id: string): Promise<ITestAnswerEntity> {
    return await this.answerRepository.findById(id);
  }

  async updateAnswer(
    id: string,
    answer: Partial<ITestAnswerEntity>,
  ): Promise<ITestAnswerEntity> {
    return await this.answerRepository.updateAnswer(id, answer);
  }

  async deleteAnswer(id: string): Promise<void> {
    try {
      return await this.answerRepository.deleteAnswer(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
