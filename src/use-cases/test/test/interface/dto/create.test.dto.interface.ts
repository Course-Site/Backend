import { ScoreMethod } from 'src/entiies/test/test/enums/score_method'

export interface ICreateTestDto {
  title: string;
  topicId: string;
  maxScore: number;
  description: string;
  maxAttempts: number;
  scoreMethod: ScoreMethod
}
