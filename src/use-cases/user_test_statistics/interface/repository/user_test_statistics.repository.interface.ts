import { IUserTestStatisticsEntity } from 'src/entiies/user_test_statistics/interface/user_test_statistics.entity.interface'
import { UserTestStatisticsEntity } from 'src/infrastructure/db/entities/user_test_statistics.entity'

export interface IUserTestStatisticsRepository {
  createOrUpdate(userId: string, testId: string, score: number): Promise<UserTestStatisticsEntity>
  findByUserAndTest(userId: string, testId: string)
  findAllUserStatistics(): Promise<IUserTestStatisticsEntity[]>;
  findById(id: string): Promise<IUserTestStatisticsEntity>;
  findAllByUserId(userId: string): Promise<IUserTestStatisticsEntity[]>;
}
