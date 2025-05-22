import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestEvaluateController } from 'src/presintation/controllers/evaluate.controller';
import { TestEvaluationService } from 'src/use-cases/test/test_evaluate/service/test_evaluate.service';
import { TestEntity } from '../db/entities/test.entity';
import { TestQuestionEntity } from '../db/entities/test_question.entity';
import { TestResultEntity } from '../db/entities/test_result.entity';
import { TestRepository } from '../db/repositories/test.repository';
import { TestResultService } from 'src/use-cases/test/test_result/service/test_result.service';
import { TestResultRepository } from '../db/repositories/test_result.repository';
import { UserTestStatisticsService } from 'src/use-cases/user_test_statistics/service/user_test_statistics.service';
import { UserStatisticsService } from 'src/use-cases/user_statistics/service/user_statistics.service';
import { UserTestStatisticsRepository } from '../db/repositories/user_test_statistics.repository';
import { UserStatisticsRepository } from '../db/repositories/user_statistics.repository';
import { UserStatisticsEntity } from '../db/entities/user_statistics.entity';
import { UserTestStatisticsEntity } from '../db/entities/user_test_statistics.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TestEntity,
      TestResultEntity,
      TestQuestionEntity,
      UserStatisticsEntity,
      UserTestStatisticsEntity,
    ]),
  ],
  controllers: [TestEvaluateController],
  providers: [
    {
      provide: 'testRepository',
      useClass: TestRepository,
    },
    {
      provide: 'testResultService',
      useClass: TestResultService,
    },
    {
      provide: 'testResultRepository',
      useClass: TestResultRepository,
    },
    {
      provide: 'userTestStatisticsService',
      useClass: UserTestStatisticsService,
    },
    {
      provide: 'userStatisticsService',
      useClass: UserStatisticsService,
    },
    {
      provide: 'userStatisticsRepository',
      useClass: UserStatisticsRepository,
    },
    {
      provide: 'userTestStatisticsRepository',
      useClass: UserTestStatisticsRepository,
    },
    {
      provide: 'userStatisticsService',
      useClass: UserStatisticsService,
    },
    {
      provide: 'testEvaluationService',
      useClass: TestEvaluationService,
    },
  ],
})
export class TestEvaluationModule {}
