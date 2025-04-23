import { ITestAnswerEntity } from 'src/entiies/test_answer/interface/test_answer.entity.interface';
import { ICreateTestAnswerDto } from '../dto/create.test_answer.dto.interface';

export interface ITestAnswerService {
  createTestAnswer(data: ICreateTestAnswerDto): Promise<ITestAnswerEntity>;
  findAllTestAnswers(): Promise<ITestAnswerEntity[]>;
  findById(id: string): Promise<ITestAnswerEntity>;
  updateTestAnswer(
    id: string,
    answer: Partial<ITestAnswerEntity>,
  ): Promise<ITestAnswerEntity>;
  deleteTestAnswer(id: string): Promise<void>;
}
