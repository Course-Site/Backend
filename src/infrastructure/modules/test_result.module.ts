import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestResultController } from 'src/presintation/controllers/test_result.controller';
import { TestResultService } from 'src/use-cases/test_result/service/test_result.service';
import { TestResultRepository } from '../db/repositories/test_result.repository';
import { TestResultEntity } from '../db/entities/test_result.entity';
import { UserStatisticsModule } from './user_statistics.module';
import { TestModule } from './test.module';
import { TestRepository } from '../db/repositories/test.repository';
import { UserTestStatisticsRepository } from '../db/repositories/user_test_statistics.repository'
import { UserTestStatisticsService } from 'src/use-cases/user_test_statistics/service/user_test_statistics.service'
import { UserTestStatisticsEntity } from '../db/entities/user_test_statistics.entity'
import { UserStatisticsRepository } from '../db/repositories/user_statistics.repository'
import { UserStatisticsService } from 'src/use-cases/user_statistics/service/user_statistics.service'
import { UserStatisticsEntity } from '../db/entities/user_statistics.entity'
import { TestEntity } from '../db/entities/test.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([TestResultEntity, UserTestStatisticsEntity, UserStatisticsEntity, TestEntity]),
  ],
  controllers: [TestResultController],
  providers: [
    {
      provide: 'testResultRepository',
      useClass: TestResultRepository,
    },
    {
      provide: 'testResultService',
      useClass: TestResultService,
    },
    {
      provide: 'testRepository',
      useClass: TestRepository,
    },
    {
      provide: 'userTestStatisticsRepository',
      useClass: UserTestStatisticsRepository,
    },
    {
      provide: 'userTestStatisticsService',
      useClass: UserTestStatisticsService,
    },
    {
      provide: 'userStatisticsRepository',
      useClass: UserStatisticsRepository,
    },
    {
      provide: 'userStatisticsService',
      useClass: UserStatisticsService,
    },
  ],
  exports: ['testResultRepository'],
})
export class TestResultModule {}

