import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreateStudentDto } from 'src/use-cases/student/interface/dto/create.student.dto.interface';
import { IStudentRepository } from 'src/use-cases/student/interface/repository/student.repository.interface';
import { StudentEntity } from '../entities/student.entity';
import { IStudentEntity } from 'src/entiies/student/interface/student.entity.interface';

@Injectable()
export class StudentRepository implements IStudentRepository 
{
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepository: Repository<StudentEntity>,
  ) {}

  async createStudent(data: ICreateStudentDto): Promise<IStudentEntity> 
  {
    try {
      const student = this.studentRepository.create(data);
      return await this.studentRepository.save(student);
    } catch (error) {
      throw error;
    }
  }

  async findAllStudents(): Promise<IStudentEntity[]> 
  {
    try {
      return this.studentRepository.find({  });
    } catch (error) {
      throw new Error('Students not found');
    }
  }

  async deleteStudent(id: string): Promise<void> 
  {
    try {
      await this.studentRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, student: Partial<IStudentEntity>): Promise<IStudentEntity>  {
    try{
    await this.studentRepository.update(id, student);
    return this.studentRepository.findOne({ where: { id } });
    } catch {
      throw new Error('Student not found');
    }
  }

  async findById(id: string): Promise<IStudentEntity> 
  {
    try {
      return this.studentRepository.findOneBy({ id });
    } catch (error) {
      throw new Error('Student not found');
    }
  }

  findByName(fullName: string): Promise<IStudentEntity> 
  {
    try {
      return this.studentRepository.findOneBy({ fullName });
    } catch (error) {
      throw new Error('Student not found');
    }
  }

  findByEmail(email: string): Promise<IStudentEntity> 
  {
    try {
      return this.studentRepository.findOneBy({ email });
    } catch (error) {
      throw new Error('Student not found');
    }
  }
}
