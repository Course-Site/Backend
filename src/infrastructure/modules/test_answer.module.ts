import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestAnswerController } from 'src/presintation/controllers/test_answer.controller';
import { TestAnswerService } from 'src/use-cases/test/test_answer/service/test_answer.service';
import { TestAnswerEntity } from '../db/entities/test_answer.entity';
import { TestAnswerRepository } from '../db/repositories/test_answer.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TestAnswerEntity])],
  controllers: [TestAnswerController],
  providers: [
    {
      provide: 'testAnswerRepository',
      useClass: TestAnswerRepository,
    },
    {
      provide: 'testAnswerService',
      useClass: TestAnswerService,
    },
  ],
})
export class TestAnswerModule {}
