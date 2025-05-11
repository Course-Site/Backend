export interface ITestAnswerEntity {
  id?: string;
  text: string;
  isCorrect: boolean;
  questionId: string;
  score: number;
}
