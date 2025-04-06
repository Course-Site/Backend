import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateLectureDto } from 'src/use-cases/lecture/interface/dto/create.lecture.dto.interface';
import { ILectureRepository } from 'src/use-cases/lecture/interface/repository/lecture.repository.interface';
import { LectureEntity } from '../entities/lecture.entity';
import { Repository } from 'typeorm';
import { ILectureEntity } from 'src/entiies/lecture/interface/lecture.entity.interface';

@Injectable()
export class LectureRepository implements ILectureRepository {
  constructor(
    @InjectRepository(LectureEntity)
    private readonly lectureRepository: Repository<LectureEntity>,
  ) {}

  async createLecture(data: ICreateLectureDto): Promise<ILectureEntity> {
    try {
      const lecture = this.lectureRepository.create(data);
      return await this.lectureRepository.save(lecture);
    } catch (error) {
      throw error;
    }
  }

  async findAllLectures(): Promise<ILectureEntity[]> {
    try {
      return this.lectureRepository.find({});
    } catch (error) {
      throw new Error('Lectures not found');
    }
  }

  async findById(lectureId: string): Promise<ILectureEntity> {
    try {
      return this.lectureRepository.findOne({ where: { id: lectureId } });
    } catch (error) {
      throw new Error('Lecture not found');
    }
  }

  async updateLecture(
    id: string,
    lecture: Partial<ILectureEntity>,
  ): Promise<ILectureEntity> {
    try {
      await this.lectureRepository.update(id, lecture);
      return this.lectureRepository.findOne({ where: { id } });
    } catch {
      throw new Error('Lecture not found');
    }
  }

  async deleteLecture(id: string): Promise<void> {
    try {
      await this.lectureRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
