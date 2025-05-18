import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestQuestionController } from 'src/presintation/controllers/test_question.controller';
import { TestQuestionService } from 'src/use-cases/test/test_question/service/test_question.service';
import { TestQuestionEntity } from '../db/entities/test_question.entity';
import { TestQuestionRepository } from '../db/repositories/test_question.repository';

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
