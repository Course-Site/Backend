import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabResultController } from 'src/presintation/controllers/lab_result.controller';
import { LabResultService } from 'src/use-cases/lab/lab_result/service/lab_result.service';
import { LabResultRepository } from '../db/repositories/lab_result.repository';
import { LabResultEntity } from '../db/entities/lab_result.entity';
import { UserStatisticsModule } from './user_statistics.module';
import { labModule } from './lab.module';
import { LabRepository } from '../db/repositories/lab.repository';
import { LabEntity } from '../db/entities/lab.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([LabResultEntity, LabEntity]),
    UserStatisticsModule,
    labModule,
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
    {
      provide: 'labRepository',
      useClass: LabRepository,
    },
  ],
})
export class LabResultModule {}
