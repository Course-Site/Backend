import { ScoreMethod } from '../enums/score_method';
import { ITestEntity } from '../interface/test.entity.interface';
import { TTestEntity } from '../type/test.entity.type';

export class TestEntity implements ITestEntity {
  id?: string;
  title: string;
  description: string;
  maxScore: number;
  topicId: string;
  maxAttempts: number;
  scoreMethod: ScoreMethod;

  constructor(data: TTestEntity) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.topicId = data.topicId;
    this.maxScore = data.maxScore;
    this.maxAttempts = data.maxAttempts;
    this.scoreMethod = data.scoreMethod;
  }
}
