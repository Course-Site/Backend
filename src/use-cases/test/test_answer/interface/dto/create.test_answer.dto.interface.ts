export interface ICreateTestAnswerDto {
  text: string;
  isCorrect: boolean;
  score: number;
  questionId: string;
}
