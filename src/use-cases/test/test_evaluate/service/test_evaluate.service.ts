import { ITestWithQuestionsEntity } from 'src/entiies/test/test/interface/test_with_questions.entity.interface';
import { ICreateTestResultDto } from '../../test_result/interface/dto/create.test_result.dto.interface';
import { IEvaluationDto } from '../interface/dto/evaluation.dto.interface';
import { ITestResultService } from '../../test_result/interface/service/test_result.service.interface';
import { ITestRepository } from '../../test/interface/repository/test.repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class TestEvaluationService {
  constructor(
    @Inject('testRepository') private testRepository: ITestRepository,
    @Inject('testResultService') private testResultService: ITestResultService,
  ) {}

  async evaluateTestSubmission(
    userId: string,
    testId: string,
    answers: IEvaluationDto[],
  ) {
    const test = await this.testRepository.findWithQuestions(testId);
    let totalScore = 0;

    for (const question of test.questions) {
      const userAnswer = answers.find((ans) => ans.questionId === question.id);
      const selectedAnswerIds = userAnswer?.selectedAnswerIds ?? [];

      const correctAnswers = question.answers.filter((ans) => ans.isCorrect);
      const correctAnswerIds = correctAnswers.map((ans) => ans.id);

      const hasIncorrectAnswers = selectedAnswerIds.some(
        (id) => !correctAnswerIds.includes(id),
      );

      if (hasIncorrectAnswers) continue;

      const correctSelectedCount = selectedAnswerIds.filter((id) =>
        correctAnswerIds.includes(id),
      ).length;

      const correctnessRatio = correctSelectedCount / correctAnswerIds.length;
      totalScore += (question.score ?? 0) * correctnessRatio;
    }

    const createDto: ICreateTestResultDto = {
      userId,
      testId,
      percentage: (totalScore / this.getMaxPossibleScore(test)) * 100,
      score: totalScore,
    };

    return {
      totalScore,
      testResultId: (await this.testResultService.createTestResult(createDto))
        .id,
    };
  }

  private getMaxPossibleScore(test: ITestWithQuestionsEntity): number {
    return test.questions.reduce((sum, q) => sum + (q.score ?? 0), 0);
  }
}
