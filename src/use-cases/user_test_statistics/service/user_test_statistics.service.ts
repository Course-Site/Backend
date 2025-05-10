import { Inject, Injectable } from '@nestjs/common';
import { UserTestStatisticsRepository } from 'src/infrastructure/db/repositories/user_test_statistics.repository';
import { TestResultRepository } from 'src/infrastructure/db/repositories/test_result.repository';
import { TestRepository } from 'src/infrastructure/db/repositories/test.repository';
import { IUserTestStatisticsRepository } from '../interface/repository/user_test_statistics.repository.interface'
import { ITestRepository } from 'src/use-cases/test/test/interface/repository/test.repository.interface'
import { ITestResultRepository } from 'src/use-cases/test_result/interface/repository/test_result.repository.interface'
import { IUserTestStatisticsEntity } from 'src/entiies/user_test_statistics/interface/user_test_statistics.entity.interface'

@Injectable()
export class UserTestStatisticsService {
  constructor(
    @Inject('userTestStatisticsRepository')
    private readonly userTestStatisticsRepository: IUserTestStatisticsRepository,
    @Inject('testResultRepository')
    private readonly testResultRepository: ITestResultRepository,
  ) {}

  async recalculate(userId: string, testId: string, scoreMethod: string): Promise<void> {
    const results = await this.testResultRepository.findResultsByUserAndTest(userId, testId);
    if (results.length === 0) return;

    const attemptStrategy = scoreMethod ?? 'best';

    let calculatedScore: number;

  switch (attemptStrategy) {
    case 'average':
      calculatedScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
      break;
    case 'last':
      calculatedScore = results[results.length - 1].score;
      break;
    case 'best':
      calculatedScore = Math.max(...results.map(r => r.score));
      break;
  }

    await this.userTestStatisticsRepository.createOrUpdate(userId, testId, calculatedScore);
  }

  async findAllUserStatistics(): Promise<IUserTestStatisticsEntity[]> {
    return await this.userTestStatisticsRepository.findAllUserStatistics();
  }
}
