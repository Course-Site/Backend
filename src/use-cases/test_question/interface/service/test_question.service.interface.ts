import { ITestQuestionEntity } from 'src/entiies/test_question/interface/test_question.entity.interface';
import { ICreateQuestionDto } from '../dto/create.test_question.dto.interface';

export interface IQuestionService {
  createQuestion(data: ICreateQuestionDto): Promise<ITestQuestionEntity>;
  findAllQuestions(): Promise<ITestQuestionEntity[]>;
  findById(id: string): Promise<ITestQuestionEntity>;
  updateQuestion(
    id: string,
    question: Partial<ITestQuestionEntity>,
  ): Promise<ITestQuestionEntity>;
  deleteQuestion(id: string): Promise<void>;
}
