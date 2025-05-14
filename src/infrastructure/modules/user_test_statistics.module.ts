import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTestStatisticsService } from 'src/use-cases/user_test_statistics/service/user_test_statistics.service';
import { UserTestStatisticsRepository } from '../db/repositories/user_test_statistics.repository';
import { UserTestStatisticsEntity } from '../db/entities/user_test_statistics.entity';
import { TestResultRepository } from '../db/repositories/test_result.repository';
import { TestResultEntity } from '../db/entities/test_result.entity';
import { UserTestStatisticsController } from 'src/presintation/controllers/user_test_statistics.controller';

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
