import { Inject, Injectable } from '@nestjs/common';
import { ITestResultEntity } from 'src/entiies/test/test_result/interface/test_result.entity.interface';
import { ITestRepository } from 'src/use-cases/test/test/interface/repository/test.repository.interface';
import { IUserStatisticsService } from 'src/use-cases/user_statistics/interface/service/user_statistics.service.interface';
import { IUserTestStatisticsService } from 'src/use-cases/user_test_statistics/interface/service/user_test_statistics.service.interface';
import { ICreateTestResultDto } from '../interface/dto/create.test_result.dto.interface';
import { ITestResultRepository } from '../interface/repository/test_result.repository.interface';
import { ITestResultService } from '../interface/service/test_result.service.interface';

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
    const pastResults =
      await this.testResultRepository.findResultsByUserAndTest(
        data.userId,
        data.testId,
      );

    if (pastResults.length >= test.maxAttempts) {
      throw new Error('Максимальное количество попыток достигнуто.');
    }

    const percent = (data.score / test.maxScore) * 100;
    const newResult = await this.testResultRepository.createTestResult({
      score: data.score,
      percentage: percent,
      userId: data.userId,
      testId: data.testId,
    });

    await this.userTestStatisticsService.recalculate(
      data.userId,
      data.testId,
      test.scoreMethod,
    );

    const IsUserStatistic = await this.userStatisticsService.findByUserId(
      data.userId,
    );

    if (IsUserStatistic.length === 0) {
      await this.userStatisticsService.createUserStatistics({
        userId: data.userId,
        totalTestScore: 0,
        totalLabScore: 0,
      });
    }
    await this.userStatisticsService.recalculateTestStatistic(data.userId);

    return newResult;
  }

  async findAllTestResult(): Promise<ITestResultEntity[]> {
    return await this.testResultRepository.findAllTestResult();
  }

  async findByTestAndUser(
    labId: string,
    userId: string,
  ): Promise<ITestResultEntity[]> {
    return this.testResultRepository.findByTestAndUser(labId, userId);
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
      updatedTestResult.userId ?? oldTestResult.userId,
      updatedTestResult.testId ?? oldTestResult.testId,
      test.scoreMethod,
    );

    await this.userStatisticsService.recalculateTestStatistic(
      updatedTestResult.userId ?? oldTestResult.userId,
    );

    return updatedTestResult;
  }

  async deleteTestResult(id: string): Promise<void> {
    const result = await this.testResultRepository.findById(id);
    await this.testResultRepository.deleteTestResult(id);
    const test = await this.testRepository.findById(result.testId);
    await this.userTestStatisticsService.recalculate(
      result.userId,
      result.testId,
      test.scoreMethod,
    );
    await this.userStatisticsService.recalculateTestStatistic(result.userId);
  }
}
