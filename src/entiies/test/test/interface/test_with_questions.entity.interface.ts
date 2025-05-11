import { ITestEntity } from './test.entity.interface';

export interface ITestWithQuestionsEntity extends ITestEntity {
  questions: {
    id: string;
    text: string;
    number: string;
    score?: number;
    answers: {
      id: string;
      text: string;
      isCorrect: boolean;
      score: number;
    }[];
  }[];
}
