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
import { ITestAnswerEntity } from 'src/entiies/test/test_answer/interface/test_answer.entity.interface';
import { UserRole } from 'src/entiies/user/enums/user-role.enum';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { RolesGuard } from 'src/infrastructure/JWT/guards/roles.guard';
import { ICreateTestAnswerDto } from 'src/use-cases/test/test_answer/interface/dto/create.test_answer.dto.interface';
import { ITestAnswerService } from 'src/use-cases/test/test_answer/interface/service/test_answer.service.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('test_answer')
@ApiTags('Test Answer')
export class TestAnswerController {
  constructor(
    @Inject('testAnswerService')
    private readonly testAnswerService: ITestAnswerService,
  ) {}

  @Roles(UserRole.ADMIN)
  @Post('create')
  @ApiOperation({ summary: 'Create a new test answer' })
  @ApiBody({
    schema: {
      properties: {
        text: { type: 'string', default: 'test' },
        isCorrect: { type: 'bool', default: '0' },
        questionId: { type: 'string', default: 'test' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The test answer has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createTestAnswer(@Body() data: ICreateTestAnswerDto) {
    return await this.testAnswerService.createTestAnswer(data);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all test answers' })
  @ApiResponse({ status: 200, description: 'Return all test answers.' })
  @ApiResponse({ status: 404, description: 'Test answers not found.' })
  async findAllTestAnswers() {
    return await this.testAnswerService.findAllTestAnswers();
  }

  @Get('findById/:id')
  @ApiOperation({ summary: 'Get a test answer by its ID' })
  @ApiParam({ name: 'id', description: 'Test answer ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return the test answer with the given ID.',
  })
  @ApiResponse({ status: 404, description: 'Test answer not found.' })
  async findById(@Param('id') id: string) {
    return await this.testAnswerService.findById(id);
  }

  @Roles(UserRole.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Change the test answer data' })
  @ApiParam({ name: 'id', description: 'Test answer ID', type: 'string' })
  @ApiBody({
    schema: {
      properties: {
        text: { type: 'string', default: 'test' },
        isCorrect: { type: 'bool', default: '0' },
        questionId: { type: 'string', default: 'test' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'test answer data has been changed.',
  })
  @ApiResponse({ status: 404, description: 'Test answer not found.' })
  async update(@Param('id') id: string, @Body() testAnswer: ITestAnswerEntity) {
    return await this.testAnswerService.updateTestAnswer(id, testAnswer);
  }

  @Roles(UserRole.ADMIN)
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a test answer by its ID' })
  @ApiParam({ name: 'id', description: 'Test answer ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The test answer has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Test answer not found.' })
  async deleteTestAnswer(@Param('id') id: string) {
    await this.testAnswerService.deleteTestAnswer(id);
  }
}
