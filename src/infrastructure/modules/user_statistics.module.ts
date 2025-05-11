import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStatisticsController } from 'src/presintation/controllers/user_statistics.controller';
import { UserStatisticsService } from 'src/use-cases/user_statistics/service/user_statistics.service';
import { UserStatisticsRepository } from '../db/repositories/user_statistics.repository';
import { UserStatisticsEntity } from '../db/entities/user_statistics.entity';
import { TestRepository } from '../db/repositories/test.repository';
import { TestResultRepository } from '../db/repositories/test_result.repository';
import { TestResultEntity } from '../db/entities/test_result.entity';
import { TestEntity } from '../db/entities/test.entity';
import { UserTestStatisticsRepository } from '../db/repositories/user_test_statistics.repository';
import { UserTestStatisticsEntity } from '../db/entities/user_test_statistics.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserStatisticsEntity, UserTestStatisticsEntity]),
  ],
  controllers: [UserStatisticsController],
  providers: [
    {
      provide: 'userStatisticsRepository',
      useClass: UserStatisticsRepository,
    },
    {
      provide: 'userStatisticsService',
      useClass: UserStatisticsService,
    },
    {
      provide: 'userTestStatisticsRepository',
      useClass: UserTestStatisticsRepository,
    },
  ],
  exports: ['userStatisticsService'],
})
export class UserStatisticsModule {}
