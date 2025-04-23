export interface ILabResultEntity {
  id?: string;
  submissionFileUrl?: string;
  score?: number;
  submittedAt: Date;
  userId: string;
  labId: string;
  userStatisticsId: string; 
}
