import { FileType } from '../enums/file_type.enum';
import { ILabReportEntity } from '../interface/lab_report.entity.interface';
import { TLabReportEntity } from '../type/lab_report.entity.type';

export class LabEntity implements ILabReportEntity {
  id?: string;
  filename: string;
  filepath: string;
  filetype: FileType;
  size: number;
  userId: string;
  labId: string;
  uploadedAt: Date;

  constructor(data: TLabReportEntity) {
    this.id = data.id;
    this.filename = data.filename;
    this.filepath = data.filepath;
    this.filetype = data.filetype;
    this.size = data.size;
    this.userId = data.userId;
    this.labId = data.labId;
    this.uploadedAt = data.uploadedAt;
  }
}
