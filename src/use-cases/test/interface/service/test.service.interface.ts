import { ITestEntity } from 'src/entiies/test/interface/test.entity.interface';
import { ICreateTestDto } from '../dto/create.test.dto.interface';

export interface ITestService {
  createTest(data: ICreateTestDto): Promise<ITestEntity>;
  findAllTests(): Promise<ITestEntity[]>;
  findById(id: string): Promise<ITestEntity>;
  updateTest(id: string, test: Partial<ITestEntity>): Promise<ITestEntity>;
  deleteTest(id: string): Promise<void>;
}
