export interface ITestResultEntity {
  id?: string;
  score: number;
  percentage: number;
  completedAt: Date;
  userId: string;
  testId: string;
  userStatisticsId: string; 
}
