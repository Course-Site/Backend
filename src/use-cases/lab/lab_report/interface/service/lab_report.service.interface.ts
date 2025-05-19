import { ILabReportEntity } from 'src/entiies/lab/lab_report/interface/lab_report.entity.interface';
import { ICreateLabReportDto } from '../dto/create.lab_report.dto.interface';

export interface ILabReportService {
  createLabReport(data: ICreateLabReportDto): Promise<ILabReportEntity>;
  findByLabAndUser(labId: string, userId: string): Promise<ILabReportEntity[]>;
}
