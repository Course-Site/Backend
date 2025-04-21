import { ITestAnswerEntity } from 'src/entiies/test_answer/interface/test_answer.entity.interface';
import { ICreateTestAnswerDto } from '../dto/create.test_answer.dto.interface';

export interface ITestAnswerRepository {
  createAnswer(data: ICreateTestAnswerDto): Promise<ITestAnswerEntity>;
  findAllAnswers(): Promise<ITestAnswerEntity[]>;
  findById(id: string): Promise<ITestAnswerEntity>;
  updateAnswer(
    id: string,
    answer: Partial<ITestAnswerEntity>,
  ): Promise<ITestAnswerEntity>;
  deleteAnswer(id: string): Promise<void>;
}
