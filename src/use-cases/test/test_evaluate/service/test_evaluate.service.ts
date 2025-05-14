import { UserTestStatisticsService } from 'src/use-cases/user_test_statistics/service/user_test_statistics.service';
import { ITestResultRepository } from '../../test_result/interface/repository/test_result.repository.interface';
import { ITestRepository } from '../../test/interface/repository/test.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ICreateTestAnswerDto } from 'src/use-cases/test/test_answer/interface/dto/create.test_answer.dto.interface';
import { ICreateTestResultDto } from '../../test_result/interface/dto/create.test_result.dto.interface';
import { IEvaluationDto } from '../interface/dto/evaluation.dto.interface';
import { ITestWithQuestionsEntity } from 'src/entiies/test/test/interface/test_with_questions.entity.interface';

@Injectable()
export class TestEvaluationService {
  constructor(
    @Inject('testRepository') private testRepository: ITestRepository,
    @Inject('testResultRepository')
    private testResultRepository: ITestResultRepository,
  ) {}

  async evaluateTestSubmission(
    userId: string,
    testId: string,
    answers: IEvaluationDto[],
  ) {
    const test: ITestWithQuestionsEntity =
      await this.testRepository.findWithQuestions(testId);

    let totalScore = 0;

    for (const question of test.questions) {
      const userAnswer = answers.find((ans) => ans.questionId === question.id);
      const selectedAnswerIds = userAnswer?.selectedAnswerIds ?? [];

      const selectedAnswers = question.answers.filter((ans) =>
        selectedAnswerIds.includes(ans.id),
      );

      const questionScore = selectedAnswers
        .filter((ans) => ans.isCorrect)
        .reduce((sum, ans) => sum + (ans.score ?? 0), 0);

      totalScore += questionScore;
    }

    const createDto: ICreateTestResultDto = {
      userId,
      testId,
      percentage: 0,
      score: totalScore,
      completedAt: new Date(),
    };

    const createdResult =
      await this.testResultRepository.createTestResult(createDto);

    return {
      totalScore,
      testResultId: createdResult.id,
    };
  }

  evaluateSingle(
    correctIds: string[],
    selectedIds: string[],
    questionScore: number,
  ): number {
    if (correctIds.length !== selectedIds.length) return 0;
    for (let i = 0; i < correctIds.length; i++) {
      if (correctIds[i] !== selectedIds[i]) return 0;
    }
    return questionScore;
  }
}
