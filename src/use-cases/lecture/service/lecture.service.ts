import { Inject, Injectable } from '@nestjs/common';
import { ILectureService } from '../interface/service/lecture.service.interface';
import { ILectureRepository } from '../interface/repository/lecture.repository.interface';
import { ILectureEntity } from 'src/entiies/lecture/interface/lecture.entity.interface';
import { ICreateLectureDto } from '../interface/dto/create.lecture.dto.interface';

@Injectable()
export class LectureService implements ILectureService {
  constructor(
    @Inject('lectureRepository')
    private readonly lectureRepository: ILectureRepository,
  ) {}

  async createLecture(data: ICreateLectureDto): Promise<ILectureEntity> {
    return this.lectureRepository.createLecture({
      title: data.title,
      content: data.content,
      topicId: data.topicId,
    });
  }

  async findAllLectures(): Promise<ILectureEntity[]> {
    return await this.lectureRepository.findAllLectures();
  }

  async findById(id: string): Promise<ILectureEntity> {
    return this.lectureRepository.findById(id);
  }

  async updateLecture(
    id: string,
    lecture: Partial<ILectureEntity>,
  ): Promise<ILectureEntity> {
    return await this.lectureRepository.updateLecture(id, lecture);
  }

  async deleteLecture(id: string): Promise<void> {
    try {
      return await this.lectureRepository.deleteLecture(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
