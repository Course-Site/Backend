import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTestStatisticsController } from 'src/presintation/controllers/user_test_statistics.controller';
import { UserTestStatisticsService } from 'src/use-cases/user_test_statistics/service/user_test_statistics.service';
import { TestResultEntity } from '../db/entities/test_result.entity';
import { UserTestStatisticsEntity } from '../db/entities/user_test_statistics.entity';
import { TestResultRepository } from '../db/repositories/test_result.repository';
import { UserTestStatisticsRepository } from '../db/repositories/user_test_statistics.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserTestStatisticsEntity, TestResultEntity]),
  ],
  controllers: [UserTestStatisticsController],
  providers: [
    {
      provide: 'userTestStatisticsRepository',
      useClass: UserTestStatisticsRepository,
    },
    {
      provide: 'userTestStatisticsService',
      useClass: UserTestStatisticsService,
    },
    {
      provide: 'testResultRepository',
      useClass: TestResultRepository,
    },
  ],
  exports: ['userTestStatisticsService'],
})
export class UserTestStatisticsModule {}
