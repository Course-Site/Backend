import { Inject, Injectable } from '@nestjs/common';
import { ICreateLabReportDto } from '../interface/dto/create.lab_report.dto.interface';
import { ILabReportEntity } from 'src/entiies/lab/lab_report/interface/lab_report.entity.interface';
import { ILabReportRepository } from '../interface/repository/lab_report.repository.interface';

@Injectable()
export class LabReportService {
  constructor(
    @Inject('labReportRepository')
    private readonly labReportRepository: ILabReportRepository,
  ) {}

  async createLabReport(data: ICreateLabReportDto): Promise<ILabReportEntity> {
    const report = this.labReportRepository.createLabReport({
      ...data,
    });
    return report;
  }

  async findAllLabReport(): Promise<ILabReportEntity[]> {
    return await this.labReportRepository.findAllLabReport();
  }

  async findByLabAndUser(
    labId: string,
    userId: string,
  ): Promise<ILabReportEntity[]> {
    return this.labReportRepository.findByLabAndUser(labId, userId);
  }

  async findById(id: string): Promise<ILabReportEntity> {
    return this.labReportRepository.findById(id);
  }
}
