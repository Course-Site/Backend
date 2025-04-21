import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionService } from 'src/use-cases/test_question/service/test_question.service';
import { QuestionRepository } from '../db/repositories/test_question.repository';
import { QuestionEntity } from '../db/entities/test_question.entity';

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
