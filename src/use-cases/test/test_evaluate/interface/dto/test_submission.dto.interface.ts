export interface ITestSubmissionDto {
  testId: string;
	userId: string;
  answers: {
    questionId: string;
    selectedAnswerIds: string[];
  }[];
}
