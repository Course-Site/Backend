import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestAnswerService } from 'src/use-cases/test_answer/service/test_answer.service';
import { TestAnswerRepository } from '../db/repositories/test_answer.repository';
import { TestAnswerEntity } from '../db/entities/test_answer.entity';
import { QuestionEntity } from '../db/entities/test_question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestAnswerEntity]), QuestionEntity],
  providers: [
    {
      provide: 'answerRepository',
      useClass: TestAnswerRepository,
    },
    {
      provide: 'answerService',
      useClass: TestAnswerService,
    },
  ],
})
export class AnswerModule {}
