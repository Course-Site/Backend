import { Controller, Get, Delete, Put, Inject, Param, Post, UseGuards, Body } from '@nestjs/common';
import { IStudentService } from 'src/use-cases/student/interface/service/student.service.interface';
import { 
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { Response } from 'express';
import { ICreateStudentDto } from 'src/use-cases/student/interface/dto/create.student.dto.interface';
import { IStudentEntity } from 'src/entiies/student/interface/student.entity.interface';


@Controller('student')
@ApiTags('Student')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class StudentController {
  constructor(
    @Inject('studentService')
    private readonly studentService: IStudentService,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new student' })
  @ApiConsumes('application/json')
  @ApiBody({
    schema: {
      properties: {
        typeOfLearning: { type: 'string', default: 'test' },
        fullName: { type: 'string', default: 'test' },
        age: { type: 'string', default: 'test' },
        city: { type: 'string', default: 'test' },
        specialty: { type: 'string', default: 'test' },
        parentsName: { type: 'string', default: 'test' },
        phone: { type: 'string', default: 'test' },
        email: { type: 'string', default: 'test' },
        url: { type: 'string', default: 'test' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'The student has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createStudent(@Body() data: ICreateStudentDto) {
    return await this.studentService.createStudent(data);
  }

  @Get('get')
  @ApiOperation({ summary: 'Get all students' })
  @ApiResponse({ status: 200, description: 'Return all students.' })
  @ApiResponse({ status: 404, description: 'Students not found.' })
  async findAllStudents() {
    return await this.studentService.findAllStudents();
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a student by its ID' })
  @ApiParam({ name: 'id', description: 'Student ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'The student has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  async deleteStudent(@Param('id') id: string) {
    await this.studentService.deleteStudent(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Change the student data' })
  @ApiParam({ name: 'id', description: 'Student ID', type: 'string' })
  @ApiBody({
    schema: {
      properties: {
        typeOfLearning: { type: 'string', default: 'test' },
        fullName: { type: 'string', default: 'test' },
        age: { type: 'string', default: 'test' },
        city: { type: 'string', default: 'test' },
        specialty: { type: 'string', default: 'test' },
        parentsName: { type: 'string', default: 'test' },
        phone: { type: 'string', default: 'test' },
        email: { type: 'string', default: 'test' },
        url: { type: 'string', default: 'test' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'student data has been changed.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  async update(@Param('id') id: string, @Body() student: IStudentEntity) {
    return await this.studentService.update(id, student);
  }

  @Get('findById/:id')
  @ApiOperation({ summary: 'Get a student by its ID' })
  @ApiParam({ name: 'id', description: 'Student ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Return the student with the given ID.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  async findById(@Param('id') id: string) {
    return await this.studentService.findById(id);
  }

  @Get('findByName/:fullName')
  @ApiOperation({ summary: 'Get a student by its Name' })
  @ApiParam({ name: 'fullName', description: 'Student fullName', type: 'string' })
  @ApiResponse({ status: 200, description: 'Return the student with the given fullname.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  async findByName(@Param('fullName') fullName: string) {
      return await this.studentService.findByName(fullName);
  };


  @Get('findByEmail/:email')
  @ApiOperation({ summary: 'Get a student by its email' })
  @ApiParam({ name: 'email', description: 'Student email', type: 'string' })
  @ApiResponse({ status: 200, description: 'Return the student with the given email.' })
  @ApiResponse({ status: 404, description: 'Student not found.' })
  async findByEmail(@Param('email') email: string) {
      return await this.studentService.findByEmail(email);
  };
}
