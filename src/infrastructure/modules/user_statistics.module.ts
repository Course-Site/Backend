import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStatisticsController } from 'src/presintation/controllers/user_statistics.controller';
import { UserStatisticsService } from 'src/use-cases/user_statistics/service/user_statistics.service';
import { UserStatisticsEntity } from '../db/entities/user_statistics.entity';
import { UserTestStatisticsEntity } from '../db/entities/user_test_statistics.entity';
import { UserStatisticsRepository } from '../db/repositories/user_statistics.repository';
import { UserTestStatisticsRepository } from '../db/repositories/user_test_statistics.repository';

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
