import { ScoreMethod } from '../enums/score_method';

export type TTestEntity = {
  id?: string;
  title: string;
  description?: string;
  maxScore: number;
  topicId: string;
  maxAttempts: number;
  scoreMethod: ScoreMethod;
};
