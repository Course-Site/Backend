import { ILabReportEntity } from 'src/entiies/lab/lab_report/interface/lab_report.entity.interface';
import { ICreateLabReportDto } from '../dto/create.lab_report.dto.interface';

export interface ILabReportRepository {
  createLabReport(data: ICreateLabReportDto): Promise<ILabReportEntity>;
  findAllLabReport(): Promise<ILabReportEntity[]>;
  findByLabAndUser(labId: string, userId: string): Promise<ILabReportEntity[]>;
  findById(id: string): Promise<ILabReportEntity>;
}
