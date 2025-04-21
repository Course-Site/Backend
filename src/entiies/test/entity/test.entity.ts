import { ITestEntity } from '../interface/test.entity.interface';
import { TTestEntity } from '../type/test.entity.type';

export class TestEntity implements ITestEntity {
  id?: string;
  title: string;
  description: string;
  topicId: string;

  constructor(data: TTestEntity) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.topicId = data.topicId;
  }
}
