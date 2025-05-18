import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestResultController } from 'src/presintation/controllers/test_result.controller';
import { TestResultService } from 'src/use-cases/test/test_result/service/test_result.service';
import { UserStatisticsService } from 'src/use-cases/user_statistics/service/user_statistics.service';
import { UserTestStatisticsService } from 'src/use-cases/user_test_statistics/service/user_test_statistics.service';
import { TestEntity } from '../db/entities/test.entity';
import { TestResultEntity } from '../db/entities/test_result.entity';
import { UserStatisticsEntity } from '../db/entities/user_statistics.entity';
import { UserTestStatisticsEntity } from '../db/entities/user_test_statistics.entity';
import { TestRepository } from '../db/repositories/test.repository';
import { TestResultRepository } from '../db/repositories/test_result.repository';
import { UserStatisticsRepository } from '../db/repositories/user_statistics.repository';
import { UserTestStatisticsRepository } from '../db/repositories/user_test_statistics.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TestResultEntity,
      UserTestStatisticsEntity,
      UserStatisticsEntity,
      TestEntity,
    ]),
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
