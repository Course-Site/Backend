import { Inject, Injectable } from '@nestjs/common';
import { IStudentService } from '../interface/service/student.service.interface';
import { IStudentRepository } from '../interface/repository/student.repository.interface';
import { IStudentEntity } from 'src/entiies/student/interface/student.entity.interface';
import { ICreateStudentDto } from '../interface/dto/create.student.dto.interface';

@Injectable()
export class StudentService implements IStudentService {
  constructor(
    @Inject('studentRepository')
    private readonly studentRepository: IStudentRepository,
  ) {}

  async createStudent(data: ICreateStudentDto): Promise<IStudentEntity> {

    return this.studentRepository.createStudent({
      typeOfLearning: data.typeOfLearning,
      fullName: data.fullName,
      age: data.age,
      city: data.city,
      specialty: data.specialty,
      parentsName: data.parentsName,
      phone: data.phone,
      email: data.email,
      url: data.url,
    });
  }

  async findAllStudents(): Promise<IStudentEntity[]> {
    return await this.studentRepository.findAllStudents();
  }

  async deleteStudent(id: string): Promise<void> {
    try {
      return await this.studentRepository.deleteStudent(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, student: Partial<IStudentEntity>): Promise<IStudentEntity>{
    return await this.studentRepository.update(id, student);
  }

  async findById(id: string): Promise<IStudentEntity> {
    return await this.studentRepository.findById(id);
  }

  async findByName(fullName: string): Promise<IStudentEntity> {
    return await this.studentRepository.findByName(fullName);
  }

  async findByEmail(email: string): Promise<IStudentEntity> {
    return await this.studentRepository.findByEmail(email);
  }
}
