export interface ICreateTestResultDto {
  score: number;
  percentage?: number;
  completedAt: Date;
  userId: string;
  testId: string;
}
