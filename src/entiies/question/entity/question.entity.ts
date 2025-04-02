import { IQuestionEntity } from '../interface/question.entity.interface';
import { TQuestionEntity } from '../type/question.entity.type';

export class QuestionEntity implements IQuestionEntity {
  id?: string;
  text: string;
  imageUrl: string;

  constructor(data: TQuestionEntity) {
    this.id = data.id;
    this.text = data.text;
    this.imageUrl = data.imageUrl
  }
}
