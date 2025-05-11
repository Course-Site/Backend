import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestEvaluateController } from 'src/presintation/controllers/evaluate.controller';
import { TestEvaluationService } from 'src/use-cases/test/test_evaluate/service/test_evaluate.service';
import { TestResultRepository } from '../db/repositories/test_result.repository';
import { TestAnswerRepository } from '../db/repositories/test_answer.repository';
import { TestRepository } from '../db/repositories/test.repository';
import { TestEntity } from '../db/entities/test.entity';
import { TestResultEntity } from '../db/entities/test_result.entity';
import { TestQuestionEntity } from '../db/entities/test_question.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			TestEntity,
			TestResultEntity,
			TestQuestionEntity,
		]),
	],
	controllers: [TestEvaluateController],
	providers: [
		{
			provide: 'testRepository',
			useClass: TestRepository,
		},
		{
			provide: 'testResultRepository',
			useClass: TestResultRepository,
		},
		{
			provide: 'testEvaluationService',
			useClass: TestEvaluationService,
		},
	],
})
export class TestEvaluationModule {}
