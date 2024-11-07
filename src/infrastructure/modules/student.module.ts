import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from 'src/presintation/controllers/student.controller';
import { StudentService } from 'src/use-cases/student/service/student.service';
import { StudentRepository } from '../db/repositories/student.repository';
import { StudentEntity } from '../db/entities/student.entity';


@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  controllers: [StudentController],
  providers: [
    {
      provide: 'studentRepository',
      useClass: StudentRepository,
    },
    {
      provide: 'studentService',
      useClass: StudentService,
    },
  ],
})
export class StudentModule {}
