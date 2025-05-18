import { ITestEntity } from 'src/entiies/test/test/interface/test.entity.interface';
import { ITestWithQuestionsEntity } from 'src/entiies/test/test/interface/test_with_questions.entity.interface';
import { ICreateTestDto } from '../dto/create.test.dto.interface';

export interface ITestRepository {
  createTest(data: ICreateTestDto): Promise<ITestEntity>;
  findAllTests(): Promise<ITestEntity[]>;
  findById(id: string): Promise<ITestEntity>;
  updateTest(id: string, test: Partial<ITestEntity>): Promise<ITestEntity>;
  deleteTest(id: string): Promise<void>;
  findWithQuestions(testId: string): Promise<ITestWithQuestionsEntity>;
}
