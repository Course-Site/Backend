import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestQuestionService } from 'src/use-cases/test/test_question/service/test_question.service';
import { TestQuestionRepository } from '../db/repositories/test_question.repository';
import { TestQuestionEntity } from '../db/entities/test_question.entity';
import { TestQuestionController } from 'src/presintation/controllers/test_question.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TestQuestionEntity])],
  controllers: [TestQuestionController],
  providers: [
    {
      provide: 'testQuestionRepository',
      useClass: TestQuestionRepository,
    },
    {
      provide: 'testQuestionService',
      useClass: TestQuestionService,
    },
  ],
})
export class TestQuestionModule {}
