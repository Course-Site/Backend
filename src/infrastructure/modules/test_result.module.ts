import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestResultController } from 'src/presintation/controllers/test_result.controller';
import { TestResultService } from 'src/use-cases/test_result/service/test_result.service';
import { TestResultRepository } from '../db/repositories/test_result.repository';
import { TestResultEntity } from '../db/entities/test_result.entity';
import { UserStatisticsModule } from './user_statistics.module'


@Module({
  imports: [TypeOrmModule.forFeature([TestResultEntity]),
  UserStatisticsModule,
  ],
  controllers: [TestResultController],
  providers: [
    {
      provide: 'testresultRepository',
      useClass: TestResultRepository,
    },
    {
      provide: 'testresultService',
      useClass: TestResultService,
    },
  ],
})
export class TestResultModule {}
