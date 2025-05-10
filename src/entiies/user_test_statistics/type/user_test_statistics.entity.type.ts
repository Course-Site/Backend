export type TUserTestStatisticsEntity = {
  id?: string;
  testId: string;
  userId: string;
  calculatedScore: number;
  lastUpdated: Date;
};
