export interface ITestAnswerEntity {
  id?: string;
  text: string;
  isCorrect: boolean;
  testQuestionId: string;
}
