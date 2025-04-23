export interface ICreateLabResultDto {
  submissionFileUrl?: string;
  score?: number;
  submittedAt: Date;
  userId: string;
  labId: string;
  userStatisticsId: string; 
}
