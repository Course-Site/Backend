import { ILectureEntity } from '../interface/lecture.entity.interface';
import { TLectureEntity } from '../type/lecture.entity.type';

export class LectureEntity implements ILectureEntity {
  id?: string;
  title: string;
  lectureFileUrl: string;

  constructor(data: TLectureEntity) {
    this.id = data.id;
    this.title = data.title;
    this.lectureFileUrl = data.lectureFileUrl;
  }
}
