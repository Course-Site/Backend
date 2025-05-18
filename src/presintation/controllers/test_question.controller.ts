import {
  Controller,
  Get,
  Delete,
  Put,
  Inject,
  Param,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ITestQuestionEntity } from 'src/entiies/test/test_question/interface/test_question.entity.interface';
import { UserRole } from 'src/entiies/user/enums/user-role.enum';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { RolesGuard } from 'src/infrastructure/JWT/guards/roles.guard';
import { ICreateTestQuestionDto } from 'src/use-cases/test/test_question/interface/dto/create.test_question.dto.interface';
import { ITestQuestionService } from 'src/use-cases/test/test_question/interface/service/test_question.service.interface';
import { CreateTestQuestionDto } from '../dto/test/create.test_question.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('testQuestion')
@ApiTags('TestQuestion')
export class TestQuestionController {
  constructor(
    @Inject('testQuestionService')
    private readonly testQuestionService: ITestQuestionService,
  ) {}

  @Roles(UserRole.ADMIN)
  @Post('create')
  @ApiOperation({ summary: 'Create a new test question' })
  @ApiBody({
    schema: {
      properties: {
        text: { type: 'string', default: 'test' },
        number: { type: 'string', default: '1' },
        testId: { type: 'string', default: 'test' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The test question has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createTestQuestion(@Body() data: ICreateTestQuestionDto) {
    return await this.testQuestionService.createTestQuestion(data);
  }

  @Roles(UserRole.ADMIN)
  @Post('massCreate')
  @ApiBody({
    description: 'Массив вопросов для создания',
    type: [CreateTestQuestionDto],
    examples: {
      basic: {
        summary: 'Пример запроса',
        value: {
          questions: [
            {
              text: 'Что такое Dependency Injection?',
              number: '1',
              testId: '585aff0c-ba6d-460d-9b40-021b57c81750',
            },
            {
              text: 'Как работает Middleware в NestJS?',
              number: '2',
              testId: '585aff0c-ba6d-460d-9b40-021b57c81750',
            },
          ],
        },
      },
    },
  })
  async createBulk(@Body() body: { questions: ICreateTestQuestionDto[] }) {
    return this.testQuestionService.createManyTestQuestions(body.questions);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all test questions' })
  @ApiResponse({ status: 200, description: 'Return all test questions.' })
  @ApiResponse({ status: 404, description: 'Test questions not found.' })
  async findAllTestQuestions() {
    return await this.testQuestionService.findAllTestQuestions();
  }

  @Get('findById/:id')
  @ApiOperation({ summary: 'Get a test question by its ID' })
  @ApiParam({ name: 'id', description: 'Test question ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return the test question with the given ID.',
  })
  @ApiResponse({ status: 404, description: 'Test question not found.' })
  async findById(@Param('id') id: string) {
    return await this.testQuestionService.findById(id);
  }

  @Roles(UserRole.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Change the test question data' })
  @ApiParam({ name: 'id', description: 'Test question ID', type: 'string' })
  @ApiBody({
    schema: {
      properties: {
        text: { type: 'string', default: 'test' },
        number: { type: 'string', default: '1' },
        testId: { type: 'string', default: 'test' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'test question data has been changed.',
  })
  @ApiResponse({ status: 404, description: 'Test question not found.' })
  async update(
    @Param('id') id: string,
    @Body() testQuestion: ITestQuestionEntity,
  ) {
    return await this.testQuestionService.updateTestQuestion(id, testQuestion);
  }

  @Roles(UserRole.ADMIN)
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a test question by its ID' })
  @ApiParam({ name: 'id', description: 'Test question ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The test question has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Test question not found.' })
  async deleteTestQuestion(@Param('id') id: string) {
    await this.testQuestionService.deleteTestQuestion(id);
  }
}
