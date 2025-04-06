import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { QuestionController } from 'src/presintation/controllers/question.controller';
import { QuestionService } from 'src/use-cases/test_question/service/test_question.service';
import { QuestionRepository } from '../db/repositories/test_question.repository';
import { QuestionEntity } from '../db/entities/test_question.entity';
import { LabResultEntity } from '../db/entities/lab_result.entity';
import { LabResultRepository } from '../db/repositories/lab_result.repository';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  //controllers: [QuestionController],
  providers: [
    {
      provide: 'questionRepository',
      useClass: QuestionRepository,
    },
    {
      provide: 'questionService',
      useClass: QuestionService,
    },
  ],
})
export class QuestionModule {}
