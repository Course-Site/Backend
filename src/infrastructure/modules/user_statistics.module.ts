import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStatisticsController } from 'src/presintation/controllers/user_statistics.controller';
import { UserStatisticsService } from 'src/use-cases/user_statistics/service/user_statistics.service';
import { UserStatisticsRepository } from '../db/repositories/user_statistics.repository';
import { UserStatisticsEntity } from '../db/entities/user_statistics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserStatisticsEntity])],
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
  ],
  exports: ['userStatisticsService'],
})
export class UserStatisticsModule {}
