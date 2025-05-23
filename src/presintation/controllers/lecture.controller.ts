import {
  Controller,
  Get,
  Delete,
  Put,
  Inject,
  Param,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ILectureEntity } from 'src/entiies/lecture/interface/lecture.entity.interface';
import { UserRole } from 'src/entiies/user/enums/user-role.enum';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { RolesGuard } from 'src/infrastructure/JWT/guards/roles.guard';
import { ICreateLectureDto } from 'src/use-cases/lecture/interface/dto/create.lecture.dto.interface';
import { ILectureService } from 'src/use-cases/lecture/interface/service/lecture.service.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('lecture')
@ApiTags('Lecture')
export class LectureController {
  constructor(
    @Inject('lectureService')
    private readonly lectureService: ILectureService,
  ) {}

  @Roles(UserRole.ADMIN)
  @Post('create')
  @ApiOperation({ summary: 'Create a new lecture' })
  @ApiBody({
    schema: {
      properties: {
        title: { type: 'string', default: 'test' },
        content: { type: 'string', default: 'test' },
        topicId: { type: 'string', default: 'test' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The lecture has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createLecture(@Body() data: ICreateLectureDto) {
    return await this.lectureService.createLecture(data);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all lectures' })
  @ApiResponse({ status: 200, description: 'Return all lectures.' })
  @ApiResponse({ status: 404, description: 'Lectures not found.' })
  async findAllLectures() {
    return await this.lectureService.findAllLectures();
  }

  @Get('findById/:id')
  @ApiOperation({ summary: 'Get a lecture by its ID' })
  @ApiParam({ name: 'id', description: 'Lecture ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return the lecture with the given ID.',
  })
  @ApiResponse({ status: 404, description: 'Lecture not found.' })
  async findById(@Param('id') id: string) {
    return await this.lectureService.findById(id);
  }

  @Roles(UserRole.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Change the lecture data' })
  @ApiParam({ name: 'id', description: 'Lecture ID', type: 'string' })
  @ApiBody({
    schema: {
      properties: {
        title: { type: 'string', default: 'test' },
        content: { type: 'string', default: 'test' },
        topicId: { type: 'string', default: 'test' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'lecture data has been changed.' })
  @ApiResponse({ status: 404, description: 'Lecture not found.' })
  async update(@Param('id') id: string, @Body() lecture: ILectureEntity) {
    return await this.lectureService.updateLecture(id, lecture);
  }

  @Roles(UserRole.ADMIN)
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a lecture by its ID' })
  @ApiParam({ name: 'id', description: 'Lecture ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The lecture has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Lecture not found.' })
  async deleteLecture(@Param('id') id: string) {
    await this.lectureService.deleteLecture(id);
  }
}
