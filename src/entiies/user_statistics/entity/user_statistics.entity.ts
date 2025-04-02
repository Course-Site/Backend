import { IUserStatisticsEntity } from '../interface/user_statistics.entity.interface';
import { TUserStatisticsEntity } from '../type/user_statistics.entity.type';

export class UserStatisticsEntity implements IUserStatisticsEntity {
  id?: string;
  totalTestScore: number;
  totalLabScore: number;
  lastUpdated: Date;

  constructor(data: TUserStatisticsEntity) {
    this.id = data.id;
    this.totalTestScore = data.totalTestScore;
    this.totalLabScore = data.totalLabScore;
    this.lastUpdated = data.lastUpdated;
  }
}
