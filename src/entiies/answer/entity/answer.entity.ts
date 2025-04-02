import { IAnswerEntity } from '../interface/answer.entity.interface';
import { TAnswerEntity } from '../type/answer.entity.type';

export class AnswerEntity implements IAnswerEntity {
  id?: string;
  text: string;
  isCorrect: boolean;

  constructor(data: TAnswerEntity) {
    this.id = data.id;
    this.text = data.text;
    this.isCorrect = data.isCorrect;
  }
}
