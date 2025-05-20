import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabResultController } from 'src/presintation/controllers/lab_result.controller';
import { LabResultService } from 'src/use-cases/lab/lab_result/service/lab_result.service';
import { LabEntity } from '../db/entities/lab.entity';
import { LabResultEntity } from '../db/entities/lab_result.entity';
import { LabRepository } from '../db/repositories/lab.repository';
import { LabResultRepository } from '../db/repositories/lab_result.repository';
import { labModule } from './lab.module';
import { UserStatisticsModule } from './user_statistics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LabResultEntity, LabEntity]),
    UserStatisticsModule,
    labModule,
  ],
  controllers: [LabResultController],
  providers: [
    {
      provide: 'labResultRepository',
      useClass: LabResultRepository,
    },
    {
      provide: 'labResultService',
      useClass: LabResultService,
    },
    {
      provide: 'labRepository',
      useClass: LabRepository,
    },
  ],
})
export class LabResultModule {}
