export interface IUserTestStatisticsEntity {
  id?: string;
  testId: string;
  userId: string;
  calculatedScore: number;
  lastUpdated: Date;
}
