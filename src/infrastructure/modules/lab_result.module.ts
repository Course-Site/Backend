import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabResultController } from 'src/presintation/controllers/lab_result.controller';
import { LabResultService } from 'src/use-cases/lab_result/service/lab_result.service';
import { LabResultRepository } from '../db/repositories/lab_result.repository';
import { LabResultEntity } from '../db/entities/lab_result.entity';
import { UserStatisticsModule } from './user_statistics.module'

@Module({
  imports: [TypeOrmModule.forFeature([LabResultEntity]),
  UserStatisticsModule,
  ],
  controllers: [LabResultController],
  providers: [
    {
      provide: 'labresultRepository',
      useClass: LabResultRepository,
    },
    {
      provide: 'labresultService',
      useClass: LabResultService,
    },
  ],
})
export class LabResultModule {}
