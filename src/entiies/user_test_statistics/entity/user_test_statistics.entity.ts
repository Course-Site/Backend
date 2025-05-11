import { IUserTestStatisticsEntity } from '../interface/user_test_statistics.entity.interface';
import { TUserTestStatisticsEntity } from '../type/user_test_statistics.entity.type';

export class UserTestStatisticsEntity implements IUserTestStatisticsEntity {
  id?: string;
  testId: string;
  userId: string;
  calculatedScore: number;
  lastUpdated: Date;

  constructor(data: TUserTestStatisticsEntity) {
    this.id = data.id;
    this.testId = data.testId;
    this.userId = data.userId;
    this.calculatedScore = data.calculatedScore;
    this.lastUpdated = data.lastUpdated;
  }
}
