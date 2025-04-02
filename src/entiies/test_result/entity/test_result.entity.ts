import { ITestResultEntity } from '../interface/test_result.entity.interface';
import { TTestResultEntity } from '../type/test_result.entity.type';

export class TestResultEntity implements ITestResultEntity {
  id?: string;
  score: number;
  percentage: number;
  totalScore: number;
  completedAt: Date;
  

  constructor(data: TTestResultEntity) {
    this.id = data.id;
    this.score = data.score;
    this.percentage = data.percentage;
    this.totalScore = data.totalScore;
    this.completedAt = data.completedAt;
  }
}
