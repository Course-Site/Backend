import { ILabResultEntity } from '../interface/lab_result.entity.interface';
import { TLabResultEntity } from '../type/lab_result.entity.type';

export class LabResultEntity implements ILabResultEntity {
  id?: string;
  submissionFileUrl?: string;
  score?: number;
  submittedAt: Date;
  userId: string;
  labId: string;
  userStatisticsId: string; 

  constructor(data: TLabResultEntity) {
    this.id = data.id;
    this.submissionFileUrl = data.submissionFileUrl;
    this.score = data.score;
    this.submittedAt = data.submittedAt;
    this.userId = data.userId;
    this.labId = data.labId;
    this.userStatisticsId = data.userStatisticsId;
  }
}
