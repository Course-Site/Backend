import { ITestQuestionEntity } from '../interface/test_question.entity.interface';

export class TestQuestionEntity implements ITestQuestionEntity {
  id?: string;
  text: string;
  number: string;
  testId: string;


  constructor(data: ITestQuestionEntity) {
    this.id = data.id;
    this.text = data.text;
    this.number = data.number;
    this.testId = data.testId;
  }
}
