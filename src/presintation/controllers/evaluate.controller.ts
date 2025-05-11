import {
  Controller,
  Post,
  Body,
  Inject,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { ITestEvaluateService } from 'src/use-cases/test/test_evaluate/interface/service/evaluate.service.interface';
import { ITestSubmissionDto } from 'src/use-cases/test/test_evaluate/interface/dto/test_submission.dto.interface';
import { CurrentUser } from 'src/infrastructure/decorators/current-user.decorator'
import { IJwtUser } from 'src/infrastructure/JWT/strategies/jwt-user.interface'

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('test-evaluate')
@ApiTags('Test Evaluation')
export class TestEvaluateController {
  constructor(
    @Inject('testEvaluationService')
    private readonly testEvaluationService: ITestEvaluateService,
  ) {}

  @Post('submit')
  @ApiOperation({ summary: 'Submit a completed test and get the result' })
  @ApiBody({
    schema: {
      properties: {
        testId: { type: 'string', default: 'test-id' },
        answers: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              questionId: { type: 'string', default: 'question-id' },
              selectedAnswerIds: {
                type: 'array',
                items: { type: 'string', default: 'answer-id' },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Test result successfully calculated and stored.' })
  @ApiResponse({ status: 400, description: 'Invalid test submission.' })
  async submitTest(
    @CurrentUser() user: IJwtUser,
    @Body() submission: ITestSubmissionDto,
  ) {
    const { testId, answers } = submission;
    return await this.testEvaluationService.evaluateTestSubmission(
      user.id,
      testId,
      answers,
    );
  }
}
