import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestAnswerService } from 'src/use-cases/test_answer/service/test_answer.service';
import { TestAnswerRepository } from '../db/repositories/test_answer.repository';
import { TestAnswerEntity } from '../db/entities/test_answer.entity';
import { TestAnswerController } from 'src/presintation/controllers/test_answer.controller';

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
