import { ILectureImageEntity } from '../interface/lecture-image.entity.interface';
import { TLectureImageEntity } from '../type/lecture-image.entity.type';

export class LectureImageEntity implements ILectureImageEntity {
  id?: string;
  imageUrl: string;

  constructor(data: TLectureImageEntity) {
    this.id = data.id;
    this.imageUrl = data.imageUrl;
  }
}
