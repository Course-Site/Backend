import { ILectureEntity } from 'src/entiies/lecture/interface/lecture.entity.interface';
import { ICreateLectureDto } from '../dto/create.lecture.dto.interface';

export interface ILectureService {
  createLecture(data: ICreateLectureDto): Promise<ILectureEntity>;
  findAllLectures(): Promise<ILectureEntity[]>;
  findById(id: string): Promise<ILectureEntity>;
  updateLecture(id: string, lecture: Partial<ILectureEntity>): Promise<ILectureEntity>;
  deleteLecture(id: string): Promise<void>;
}
