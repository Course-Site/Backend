import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabReportService } from 'src/use-cases/lab/lab_report/service/lab_report.service';
import { LabReportController } from 'src/presintation/controllers/lab_report.controller';
import { LabReportEntity } from '../db/entities/lab_report.entity';
import { labReportRepository } from '../db/repositories/lab_report.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LabReportEntity])],
  controllers: [LabReportController],
  providers: [
    {
      provide: 'labReportRepository',
      useClass: labReportRepository,
    },
    {
      provide: 'labReportService',
      useClass: LabReportService,
    },
  ],
})
export class LabReportModule {}
