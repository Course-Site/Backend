import { FileType } from 'src/entiies/lab/lab_report/enums/file_type.enum';

export interface ICreateLabReportDto {
  filename: string;
  filepath: string;
  filetype: FileType;
  size: number;
  userId: string;
  labId: string;
}
