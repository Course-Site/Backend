import { IAnswerEntity } from 'src/entiies/answer/interface/answer.entity.interface';
import { ICreateAnswerDto } from '../dto/create.test_answer.dto.interface';

export interface IAnswerRepository {
  createAnswer(data: ICreateAnswerDto): Promise<IAnswerEntity>;
  findAllAnswers(): Promise<IAnswerEntity[]>;
  findById(id: string): Promise<IAnswerEntity>;
  updateAnswer(
    id: string,
    answer: Partial<IAnswerEntity>,
  ): Promise<IAnswerEntity>;
  deleteAnswer(id: string): Promise<void>;
}
