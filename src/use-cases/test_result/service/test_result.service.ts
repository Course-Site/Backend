import { Inject, Injectable } from '@nestjs/common';
import { ITestResultService } from '../interface/service/test_result.service.interface';
import { ITestResultRepository } from '../interface/repository/test_result.repository.interface';
import { ITestResultEntity } from 'src/entiies/test_result/interface/test_result.entity.interface';
import { ICreateTestResultDto } from '../interface/dto/create.test_result.dto.interface';
import { CreateUserDto } from 'src/presintation/dto/user/create.user.dto'
import { IUserStatisticsService } from 'src/use-cases/user_statistics/interface/service/user_statistics.service.interface'
import { UserStatisticsService } from 'src/use-cases/user_statistics/service/user_statistics.service'
import { ITestRepository } from 'src/use-cases/test/interface/repository/test.repository.interface'

@Injectable()
export class TestResultService implements ITestResultService {
  constructor(
    @Inject('testresultRepository')
    private readonly testresultRepository: ITestResultRepository,
    @Inject('testRepository')
    private readonly testRepository: ITestRepository,
    @Inject('userStatisticsService')
    private readonly userStatisticsService: IUserStatisticsService,
  ) {}

  async createTestResult(
    data: ICreateTestResultDto,
  ): Promise<ITestResultEntity> {
    await this.userStatisticsService.updateTestStatistics(data.userId, data.score);
    const test = await this.testRepository.findById(data.testId);
    const percent = (data.score / test.maxScore) * 100;
    return this.testresultRepository.createTestResult({
      score: data.score,
      percentage: percent,
      completedAt: data.completedAt,
      userId: data.userId,
      testId: data.testId,
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
    testResult: Partial<ITestResultEntity>,
  ): Promise<ITestResultEntity> {
    const oldTestResult = await this.testresultRepository.findById(id);

    if (testResult.score !== undefined) {
      const test = await this.testRepository.findById(oldTestResult.testId);
      const newPercentage = (testResult.score / test.maxScore) * 100;
      testResult.percentage = newPercentage;
    }
    
    const updatedTestResult = await this.testresultRepository.updateTestResult(id, testResult);
    if (updatedTestResult.userId && updatedTestResult.score !== undefined) {
      const scoreDifference = (updatedTestResult.score || 0) - (oldTestResult.score || 0);
      await this.userStatisticsService.updateTestStatistics(
        updatedTestResult.userId,
        scoreDifference,
      );
    }
    return updatedTestResult;
  }

  async deleteTestResult(id: string): Promise<void> {
    try {
      return await this.testresultRepository.deleteTestResult(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
