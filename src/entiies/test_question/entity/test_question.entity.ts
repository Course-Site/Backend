import { ITestQuestionEntity } from '../interface/test_question.entity.interface';

export class TestQuestionEntity implements ITestQuestionEntity {
  id?: string;
  questionText: string;
  imageUrl: string;
  number: string;
  testId: string;


  constructor(data: ITestQuestionEntity) {
    this.id = data.id;
    this.questionText = data.questionText;
    this.imageUrl = data.imageUrl;
    this.number = data.number;
    this.testId = data.testId;
  }
}
