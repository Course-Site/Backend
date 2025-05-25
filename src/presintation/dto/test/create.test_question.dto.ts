import { ICreateTestQuestionDto } from 'src/use-cases/test/test_question/interface/dto/create.test_question.dto.interface';

export class CreateTestQuestionDto implements ICreateTestQuestionDto {
  text: string;
  number: string;
  score: number;
  testId: string;
}
