export type TTestResultEntity = {
  id?: string;
  score: number;
  percentage: number;
  totalScore: number;
  completedAt: Date;
  userId: string;
  testId: string;
  userStatisticsId: string; 
};
