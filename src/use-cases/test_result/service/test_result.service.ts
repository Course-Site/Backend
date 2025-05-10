import { Inject, Injectable } from '@nestjs/common';
import { ITestResultService } from '../interface/service/test_result.service.interface';
import { ITestResultRepository } from '../interface/repository/test_result.repository.interface';
import { ITestResultEntity } from 'src/entiies/test_result/interface/test_result.entity.interface';
import { ICreateTestResultDto } from '../interface/dto/create.test_result.dto.interface';
import { IUserStatisticsService } from 'src/use-cases/user_statistics/interface/service/user_statistics.service.interface';
import { ITestRepository } from 'src/use-cases/test/test/interface/repository/test.repository.interface';
import { IUserTestStatisticsService } from 'src/use-cases/user_test_statistics/interface/service/user_test_statistics.service.interface'

@Injectable()
export class TestResultService implements ITestResultService {
  constructor(
    @Inject('testResultRepository')
    private readonly testResultRepository: ITestResultRepository,
    @Inject('testRepository')
    private readonly testRepository: ITestRepository,
    @Inject('userTestStatisticsService')
    private readonly userTestStatisticsService: IUserTestStatisticsService,
    @Inject('userStatisticsService')
    private readonly userStatisticsService: IUserStatisticsService,
  ) {}

  async createTestResult(
    data: ICreateTestResultDto,
  ): Promise<ITestResultEntity> {
    const test = await this.testRepository.findById(data.testId);
    const pastResults = await this.testResultRepository.findResultsByUserAndTest(data.userId, data.testId);

    if (pastResults.length >= test.maxAttempts) {
      throw new Error('Максимальное количество попыток достигнуто.');
    }

    const percent = (data.score / test.maxScore) * 100;
    const newResult = await this.testResultRepository.createTestResult({
      score: data.score,
      percentage: percent,
      completedAt: data.completedAt,
      userId: data.userId,
      testId: data.testId,
    });

    await this.userTestStatisticsService.recalculate(data.userId, data.testId, test.scoreMethod);
    await this.userStatisticsService.recalculateTestStatistic(data.userId);

    return newResult;
  }

  async findAllTestResult(): Promise<ITestResultEntity[]> {
    return await this.testResultRepository.findAllTestResult();
  }

  async findById(id: string): Promise<ITestResultEntity> {
    return this.testResultRepository.findById(id);
  }

  async updateTestResult(
  id: string,
  testResult: Partial<ITestResultEntity>,
): Promise<ITestResultEntity> {
  const oldTestResult = await this.testResultRepository.findById(id);

  const test = await this.testRepository.findById(oldTestResult.testId);
  if (testResult.score !== undefined) {
    const newPercentage = (testResult.score / test.maxScore) * 100;
    testResult.percentage = newPercentage;
  }

  const updatedTestResult = await this.testResultRepository.updateTestResult(
    id,
    testResult,
  );

  await this.userTestStatisticsService.recalculate(
    updatedTestResult.userId,
    updatedTestResult.testId,
    test.scoreMethod,
  );

  return updatedTestResult;
  }


  async deleteTestResult(id: string): Promise<void> {
  const result = await this.testResultRepository.findById(id);
  await this.testResultRepository.deleteTestResult(id);
  const test = await this.testRepository.findById(result.testId);
  await this.userTestStatisticsService.recalculate(result.userId, result.testId, test.scoreMethod);
  }
}
