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
import { ITestResultService } from 'src/use-cases/test_result/interface/service/test_result.service.interface';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ICreateTestResultDto } from 'src/use-cases/test_result/interface/dto/create.test_result.dto.interface';
import { ITestResultEntity } from 'src/entiies/test_result/interface/test_result.entity.interface';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { RolesGuard } from 'src/infrastructure/JWT/guards/roles.guard';
import { UserRole } from 'src/entiies/user/enums/user-role.enum';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('testresult')
@ApiTags('TestResult')
export class TestResultController {
  constructor(
    @Inject('testResultService')
    private readonly testResultService: ITestResultService,
  ) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('create')
  @ApiOperation({ summary: 'Create a new testresult' })
  @ApiBody({
    schema: {
      properties: {
        score: { type: 'number', default: '0' },
        complitedAt: { type: 'Date', default: '01.04.2025' },
        userId: { type: 'string', default: 'test' },
        testId: { type: 'string', default: 'test' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The testresult has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createTestResult(@Body() data: ICreateTestResultDto) {
    return await this.testResultService.createTestResult(data);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all testresults' })
  @ApiResponse({ status: 200, description: 'Return all testresults.' })
  @ApiResponse({ status: 404, description: 'TestResults not found.' })
  async findAllTestResults() {
    return await this.testResultService.findAllTestResult();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('findById/:id')
  @ApiOperation({ summary: 'Get a testresult by its ID' })
  @ApiParam({ name: 'id', description: 'TestResult ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return the testresult with the given ID.',
  })
  @ApiResponse({ status: 404, description: 'TestResult not found.' })
  async findById(@Param('id') id: string) {
    return await this.testResultService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Change the testresult data' })
  @ApiParam({ name: 'id', description: 'TestResult ID', type: 'string' })
  @ApiBody({
    schema: {
      properties: {
        score: { type: 'number', default: '0' },
        complitedAt: { type: 'Date', default: '01.04.2025' },
        userId: { type: 'string', default: 'test' },
        testId: { type: 'string', default: 'test' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'testresult data has been changed.',
  })
  @ApiResponse({ status: 404, description: 'TestResult not found.' })
  async update(@Param('id') id: string, @Body() testresult: ITestResultEntity) {
    return await this.testResultService.updateTestResult(id, testresult);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a testresult by its ID' })
  @ApiParam({ name: 'id', description: 'TestResult ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The testresult has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'TestResult not found.' })
  async deleteTestResult(@Param('id') id: string) {
    await this.testResultService.deleteTestResult(id);
  }
}
