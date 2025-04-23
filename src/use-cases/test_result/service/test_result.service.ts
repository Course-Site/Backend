import { Inject, Injectable } from '@nestjs/common';
import { ITestResultService } from '../interface/service/test_result.service.interface';
import { ITestResultRepository } from '../interface/repository/test_result.repository.interface';
import { ITestResultEntity } from 'src/entiies/test_result/interface/test_result.entity.interface';
import { ICreateTestResultDto } from '../interface/dto/create.test_result.dto.interface';

@Injectable()
export class TestResultService implements ITestResultService {
  constructor(
    @Inject('testresultRepository')
    private readonly testresultRepository: ITestResultRepository,
  ) {}

  async createTestResult(
    data: ICreateTestResultDto,
  ): Promise<ITestResultEntity> {
    return this.testresultRepository.createTestResult({
      score: data.score,
      percentage: data.percentage,
      completedAt: data.completedAt,
      userId: data.userId,
      testId: data.testId,
      userStatisticsId: data.userStatisticsId,
    });
  }

  async findAllTestResult(): Promise<ITestResultEntity[]> {
    return await this.testresultRepository.findAllTestResult();
  }

  async findById(id: string): Promise<ITestResultEntity> {
    return this.testresultRepository.findById(id);
  }

  async updateTestResult(
    id: string,
    testresult: Partial<ITestResultEntity>,
  ): Promise<ITestResultEntity> {
    return await this.testresultRepository.updateTestResult(id, testresult);
  }

  async deleteTestResult(id: string): Promise<void> {
    try {
      return await this.testresultRepository.deleteTestResult(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
