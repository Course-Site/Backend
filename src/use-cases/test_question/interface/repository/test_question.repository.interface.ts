import { ITestQuestionEntity } from 'src/entiies/test_question/interface/test_question.entity.interface';
import { ICreateTestQuestionDto } from '../dto/create.test_question.dto.interface';

export interface ITestQuestionRepository {
  createTestQuestion(data: ICreateTestQuestionDto): Promise<ITestQuestionEntity>;
  createManyTestQuestions(data: ICreateTestQuestionDto[]): Promise<ITestQuestionEntity[]>;
  findAllTestQuestions(): Promise<ITestQuestionEntity[]>;
  findById(id: string): Promise<ITestQuestionEntity>;
  updateTestQuestion(
    id: string,
    question: Partial<ITestQuestionEntity>,
  ): Promise<ITestQuestionEntity>;
  deleteTestQuestion(id: string): Promise<void>;
}
