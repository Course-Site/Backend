import { IQuestionEntity } from 'src/entiies/question/interface/question.entity.interface';
import { ICreateQuestionDto } from '../dto/create.test_question.dto.interface';

export interface IQuestionRepository {
  createQuestion(data: ICreateQuestionDto): Promise<IQuestionEntity>;
  findAllQuestions(): Promise<IQuestionEntity[]>;
  findById(id: string): Promise<IQuestionEntity>;
  updateQuestion(
    id: string,
    question: Partial<IQuestionEntity>,
  ): Promise<IQuestionEntity>;
  deleteQuestion(id: string): Promise<void>;
}
