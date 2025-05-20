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
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { ILabResultEntity } from 'src/entiies/lab/lab_result/interface/lab_result.entity.interface';
import { UserRole } from 'src/entiies/user/enums/user-role.enum';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { RolesGuard } from 'src/infrastructure/JWT/guards/roles.guard';
import { ICreateLabResultDto } from 'src/use-cases/lab/lab_result/interface/dto/create.lab_result.dto.interface';
import { ILabResultService } from 'src/use-cases/lab/lab_result/interface/service/lab_result.service.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('labresult')
@ApiTags('LabResult')
export class LabResultController {
  constructor(
    @Inject('labResultService')
    private readonly labResultService: ILabResultService,
  ) {}

  @Roles(UserRole.ADMIN)
  @Post('create')
  @ApiOperation({ summary: 'Create a new labresult' })
  @ApiBody({
    schema: {
      properties: {
        submissionFileUrl: { type: 'string', default: 'test' },
        score: { type: 'number', default: '0' },
        userId: { type: 'string', default: '0' },
        labId: { type: 'string', default: '0' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The labresult has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createLabResult(@Body() data: ICreateLabResultDto) {
    return await this.labResultService.createLabResult(data);
  }

  @Roles(UserRole.ADMIN)
  @Get('getAll')
  @ApiOperation({ summary: 'Get all labresults' })
  @ApiResponse({ status: 200, description: 'Return all labresults.' })
  @ApiResponse({ status: 404, description: 'LabResults not found.' })
  async findAllLabResults() {
    return await this.labResultService.findAllLabResult();
  }

  @Get('GetByLabAndUser')
  @ApiOperation({ summary: 'Get the labresult' })
  @ApiQuery({ name: 'labId', type: 'string', required: true, example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  @ApiQuery({ name: 'userId', type: 'string', required: true, example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  @ApiResponse({
    status: 200,
    description: 'The labResult has been successfully returned',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async findByLabAndUser(
    @Query('labId') labId: string,
    @Query('userId') userId: string,
  ) {
    return await this.labResultService.findByLabAndUser(labId, userId);
  }

  @Get('findById/:id')
  @ApiOperation({ summary: 'Get a labresult by its ID' })
  @ApiParam({ name: 'id', description: 'LabResult ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return the labresult with the given ID.',
  })
  @ApiResponse({ status: 404, description: 'LabResult not found.' })
  async findById(@Param('id') id: string) {
    return await this.labResultService.findById(id);
  }

  @Roles(UserRole.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Change the labresult data' })
  @ApiParam({ name: 'id', description: 'LabResult ID', type: 'string' })
  @ApiBody({
    schema: {
      properties: {
        submissionFileUrl: { type: 'string', default: 'test' },
        score: { type: 'number', default: '0' },
        userId: { type: 'string', default: '0' },
        labId: { type: 'string', default: '0' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'labresult data has been changed.',
  })
  @ApiResponse({ status: 404, description: 'LabResult not found.' })
  async update(@Param('id') id: string, @Body() labresult: ILabResultEntity) {
    return await this.labResultService.updateLabResult(id, labresult);
  }

  @Roles(UserRole.ADMIN)
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a labresult by its ID' })
  @ApiParam({ name: 'id', description: 'LabResult ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The labresult has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'LabResult not found.' })
  async deleteLabResult(@Param('id') id: string) {
    await this.labResultService.deleteLabResult(id);
  }
}
