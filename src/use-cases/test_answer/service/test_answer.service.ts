import { Inject, Injectable } from '@nestjs/common';
import { IAnswerService } from '../interface/service/test_answer.service.interface';
import { IAnswerRepository } from '../interface/repository/test_answer.repository.interface';
import { IAnswerEntity } from 'src/entiies/answer/interface/answer.entity.interface';
import { ICreateAnswerDto } from '../interface/dto/create.test_answer.dto.interface';

@Injectable()
export class AnswerService implements IAnswerService {
  constructor(
    @Inject('answerRepository')
    private readonly answerRepository: IAnswerRepository,
  ) {}

  async createAnswer(data: ICreateAnswerDto): Promise<IAnswerEntity> {
    return this.answerRepository.createAnswer({
      text: data.text,
      isCorrect: data.isCorrect,
    });
  }

  async findAllAnswers(): Promise<IAnswerEntity[]> {
    return await this.answerRepository.findAllAnswers();
  }

  async findById(id: string): Promise<IAnswerEntity> {
    return await this.answerRepository.findById(id);
  }

  async updateAnswer(
    id: string,
    answer: Partial<IAnswerEntity>,
  ): Promise<IAnswerEntity> {
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
