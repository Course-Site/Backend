import { IUserTestStatisticsEntity } from 'src/entiies/user_test_statistics/interface/user_test_statistics.entity.interface';
import { UserTestStatisticsEntity } from 'src/infrastructure/db/entities/user_test_statistics.entity';

export interface IUserTestStatisticsService {
  recalculate(
    userId: string,
    testId: string,
    scoreMethod: string,
  ): Promise<UserTestStatisticsEntity>;
  findAllUserTestStatistics(): Promise<IUserTestStatisticsEntity[]>;
  findById(id: string): Promise<IUserTestStatisticsEntity>;
  findByUserId(userId: string): Promise<IUserTestStatisticsEntity>;
  deleteUserTestStatistics(id: string): Promise<void>;
}
