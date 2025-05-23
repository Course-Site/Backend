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
import { ScoreMethod } from 'src/entiies/test/test/enums/score_method';
import { ITestEntity } from 'src/entiies/test/test/interface/test.entity.interface';
import { UserRole } from 'src/entiies/user/enums/user-role.enum';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { RolesGuard } from 'src/infrastructure/JWT/guards/roles.guard';
import { ICreateTestDto } from 'src/use-cases/test/test/interface/dto/create.test.dto.interface';
import { ITestService } from 'src/use-cases/test/test/interface/service/test.service.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('test')
@ApiTags('Test')
export class TestController {
  constructor(
    @Inject('testService')
    private readonly testService: ITestService,
  ) {}

  @Roles(UserRole.ADMIN)
  @Post('create')
  @ApiOperation({ summary: 'Create a new test' })
  @ApiBody({
    schema: {
      properties: {
        title: { type: 'string', default: 'test' },
        description: { type: 'string', default: 'test' },
        topicId: { type: 'string', default: 'test' },
        maxScore: { type: 'number', default: '5' },
        maxAttempts: { type: 'number', default: '5' },
        scoreMethod: { type: 'string', default: ScoreMethod.AVERAGE },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The test has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createTest(@Body() data: ICreateTestDto) {
    return await this.testService.createTest(data);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all tests' })
  @ApiResponse({ status: 200, description: 'Return all tests.' })
  @ApiResponse({ status: 404, description: 'Tests not found.' })
  async findAllTests() {
    return await this.testService.findAllTests();
  }

  @Roles(UserRole.ADMIN)
  @Get('findById/:id')
  @ApiOperation({ summary: 'Get a test by its ID' })
  @ApiParam({ name: 'id', description: 'Test ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return the test with the given ID.',
  })
  @ApiResponse({ status: 404, description: 'Test not found.' })
  async findById(@Param('id') id: string) {
    return await this.testService.findById(id);
  }

  @Roles(UserRole.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Change the test data' })
  @ApiParam({ name: 'id', description: 'Test ID', type: 'string' })
  @ApiBody({
    schema: {
      properties: {
        title: { type: 'string', default: 'test' },
        description: { type: 'string', default: 'test' },
        topicId: { type: 'string', default: 'test' },
        maxScore: { type: 'number', default: '5' },
        maxAttempts: { type: 'number', default: '5' },
        scoreMethod: { type: 'string', default: ScoreMethod.AVERAGE },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'test data has been changed.' })
  @ApiResponse({ status: 404, description: 'Test not found.' })
  async update(@Param('id') id: string, @Body() test: ITestEntity) {
    return await this.testService.updateTest(id, test);
  }

  @Roles(UserRole.ADMIN)
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a test by its ID' })
  @ApiParam({ name: 'id', description: 'Test ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The test has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Test not found.' })
  async deleteTest(@Param('id') id: string) {
    await this.testService.deleteTest(id);
  }
}
