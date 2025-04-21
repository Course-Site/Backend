import { ITestAnswerEntity } from '../interface/test_answer.entity.interface';
import { TTestAnswerEntity } from '../type/test_answer.entity.type';

export class TestAnswerEntity implements ITestAnswerEntity {
  id?: string;
  text: string;
  isCorrect: boolean;

  constructor(data: TTestAnswerEntity) {
    this.id = data.id;
    this.text = data.text;
    this.isCorrect = data.isCorrect;
  }
}
