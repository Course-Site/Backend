import { FileType } from '../enums/file_type.enum';

export interface ILabReportEntity {
  id?: string;
  filename: string;
  filepath: string;
  filetype: FileType;
  size: number;
  userId: string;
  labId: string;
  uploadedAt: Date;
}
