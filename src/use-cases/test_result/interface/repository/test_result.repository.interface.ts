import { ITestResultEntity } from 'src/entiies/test_result/interface/test_result.entity.interface';
import { ICreateTestResultDto } from '../dto/create.test_result.dto.interface';

export interface ITestResultRepository {
  createTestResult(data: ICreateTestResultDto): Promise<ITestResultEntity>;
  findAllTestResult(): Promise<ITestResultEntity[]>;
  findById(id: string): Promise<ITestResultEntity>;
  updateTestResult(
    id: string,
    testresult: Partial<ITestResultEntity>,
  ): Promise<ITestResultEntity>;
  deleteTestResult(id: string): Promise<void>;
}
