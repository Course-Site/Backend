import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILabReportEntity } from 'src/entiies/lab/lab_report/interface/lab_report.entity.interface';
import { ICreateLabReportDto } from 'src/use-cases/lab/lab_report/interface/dto/create.lab_report.dto.interface';
import { ILabReportRepository } from 'src/use-cases/lab/lab_report/interface/repository/lab_report.repository.interface';
import { Repository } from 'typeorm';
import { LabReportEntity } from '../entities/lab_report.entity';

@Injectable()
export class labReportRepository implements ILabReportRepository {
  constructor(
    @InjectRepository(LabReportEntity)
    private readonly labReportRepository: Repository<LabReportEntity>,
  ) {}

  async createLabReport(data: ICreateLabReportDto): Promise<ILabReportEntity> {
    try {
      const labreport = this.labReportRepository.create(data);
      return await this.labReportRepository.save(labreport);
    } catch (error) {
      throw error;
    }
  }

  async findByLabAndUser(labId: string, userId: string) {
    return this.labReportRepository.find({
      where: {
        labId: labId,
        userId: userId,
      },
    });
  }

  async findAllLabReport(): Promise<ILabReportEntity[]> {
    try {
      return this.labReportRepository.find({});
    } catch (error) {
      throw new Error('LabReports not found');
    }
  }

  async findById(labreportId: string): Promise<ILabReportEntity> {
    try {
      return this.labReportRepository.findOne({
        where: { id: labreportId },
      });
    } catch (error) {
      throw new Error('LabReport not found');
    }
  }

  async updateLabReport(
    id: string,
    labreport: Partial<ILabReportEntity>,
  ): Promise<ILabReportEntity> {
    try {
      await this.labReportRepository.update(id, labreport);
      return this.labReportRepository.findOne({ where: { id } });
    } catch {
      throw new Error('LabReport not found');
    }
  }

  async deleteLabReport(id: string): Promise<void> {
    try {
      await this.labReportRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
