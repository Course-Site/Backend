export interface ICreateLabResultDto {
  submissionFileUrl?: string;
  score: number;
  percentage: number;
  submittedAt: Date;
  userId: string;
  labId: string;
}
