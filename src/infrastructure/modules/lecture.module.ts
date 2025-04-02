import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureController } from 'src/presintation/controllers/lecture.controller';
import { LectureService } from 'src/use-cases/lecture/service/lecture.service';
import { LectureRepository } from '../db/repositories/lecture.repository';
import { LectureEntity } from '../db/entities/lecture.entity';
import { LabResultEntity } from '../db/entities/lab_result.entity'
import { LabResultRepository } from '../db/repositories/lab_result.repository'

@Module({
  imports: [TypeOrmModule.forFeature([LectureEntity])],
  controllers: [LectureController],
  providers: [
	{
	  provide: 'lectureRepository',
	  useClass: LectureRepository,
	},
	{
	  provide: 'lectureService',
	  useClass: LectureService,
	}
  ],
})
export class LectureModule {}
