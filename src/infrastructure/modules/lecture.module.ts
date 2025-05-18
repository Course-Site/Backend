import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LectureController } from 'src/presintation/controllers/lecture.controller';
import { LectureService } from 'src/use-cases/lecture/service/lecture.service';
import { LectureEntity } from '../db/entities/lecture.entity';
import { LectureRepository } from '../db/repositories/lecture.repository';

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
    },
  ],
})
export class LectureModule {}
