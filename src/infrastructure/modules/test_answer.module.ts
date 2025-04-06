import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerService } from 'src/use-cases/test_answer/service/test_answer.service';
import { AnswerRepository } from '../db/repositories/test_answer.repository';
import { AnswerEntity } from '../db/entities/test_answer.entity';
import { LabResultEntity } from '../db/entities/lab_result.entity';
import { LabResultRepository } from '../db/repositories/lab_result.repository';
import { QuestionEntity } from '../db/entities/test_question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity]), QuestionEntity],
  providers: [
    {
      provide: 'answerRepository',
      useClass: AnswerRepository,
    },
    {
      provide: 'answerService',
      useClass: AnswerService,
    },
  ],
})
export class AnswerModule {}
