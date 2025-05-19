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
import { ITestResultEntity } from 'src/entiies/test/test_result/interface/test_result.entity.interface';
import { UserRole } from 'src/entiies/user/enums/user-role.enum';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { RolesGuard } from 'src/infrastructure/JWT/guards/roles.guard';
import { ICreateTestResultDto } from 'src/use-cases/test/test_result/interface/dto/create.test_result.dto.interface';
import { ITestResultService } from 'src/use-cases/test/test_result/interface/service/test_result.service.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('testresult')
@ApiTags('TestResult')
export class TestResultController {
  constructor(
    @Inject('testResultService')
    private readonly testResultService: ITestResultService,
  ) {}

  @Roles(UserRole.ADMIN)
  @Post('create')
  @ApiOperation({ summary: 'Create a new testResult' })
  @ApiBody({
    schema: {
      properties: {
        score: { type: 'number', default: '0' },
        userId: { type: 'string', default: 'test' },
        testId: { type: 'string', default: 'test' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The testResult has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createTestResult(@Body() data: ICreateTestResultDto) {
    return await this.testResultService.createTestResult(data);
  }

  @Roles(UserRole.ADMIN)
  @Get('getAll')
  @ApiOperation({ summary: 'Get all testResults' })
  @ApiResponse({ status: 200, description: 'Return all testResults.' })
  @ApiResponse({ status: 404, description: 'TestResults not found.' })
  async findAllTestResults() {
    return await this.testResultService.findAllTestResult();
  }

  @Roles(UserRole.ADMIN)
  @Get('findById/:id')
  @ApiOperation({ summary: 'Get a testResult by its ID' })
  @ApiParam({ name: 'id', description: 'TestResult ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return the testResult with the given ID.',
  })
  @ApiResponse({ status: 404, description: 'TestResult not found.' })
  async findById(@Param('id') id: string) {
    return await this.testResultService.findById(id);
  }

  @Roles(UserRole.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Change the testResult data' })
  @ApiParam({ name: 'id', description: 'TestResult ID', type: 'string' })
  @ApiBody({
    schema: {
      properties: {
        score: { type: 'number', default: '0' },
        userId: { type: 'string', default: 'test' },
        testId: { type: 'string', default: 'test' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'testResult data has been changed.',
  })
  @ApiResponse({ status: 404, description: 'TestResult not found.' })
  async update(@Param('id') id: string, @Body() testResult: ITestResultEntity) {
    return await this.testResultService.updateTestResult(id, testResult);
  }

  @Roles(UserRole.ADMIN)
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a testResult by its ID' })
  @ApiParam({ name: 'id', description: 'TestResult ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The testResult has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'TestResult not found.' })
  async deleteTestResult(@Param('id') id: string) {
    await this.testResultService.deleteTestResult(id);
  }
}
