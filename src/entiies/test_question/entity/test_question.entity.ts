import { ITestQuestionEntity } from '../interface/test_question.entity.interface';

export class TestQuestionEntity implements ITestQuestionEntity {
  id?: string;
  questionText: string;
  options: string[];
  correctAnswers: string[];

  constructor(data: ITestQuestionEntity) {
    this.id = data.id;
    this.questionText = data.questionText;
    this.options = data.options || [];
    this.correctAnswers = data.correctAnswers || [];
  }
}
