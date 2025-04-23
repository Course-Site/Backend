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
import { ILabResultService } from 'src/use-cases/lab_result/interface/service/lab_result.service.interface';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ICreateLabResultDto } from 'src/use-cases/lab_result/interface/dto/create.lab_result.dto.interface';
import { ILabResultEntity } from 'src/entiies/lab_result/interface/lab_result.entity.interface';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { RolesGuard } from 'src/infrastructure/JWT/guards/roles.guard';
import { UserRole } from 'src/entiies/user/enums/user-role.enum';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('labresult')
@ApiTags('LabResult')
export class LabResultController {
  constructor(
    @Inject('labresultService')
    private readonly labresultService: ILabResultService,
  ) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('create')
  @ApiOperation({ summary: 'Create a new labresult' })
  @ApiBody({
    schema: {
      properties: {
        submissionFileUrl: { type: 'string', default: 'test' },
        score: { type: 'number', default: '0' },
        submittedAt: { type: 'Date', default: '01.04.2025' },
        userId: { type: 'string', default: '0' },
        labId: { type: 'string', default: '0' },
        userStatisticsId: { type: 'string', default: '0' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The labresult has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createLabResult(@Body() data: ICreateLabResultDto) {
    return await this.labresultService.createLabResult(data);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all labresults' })
  @ApiResponse({ status: 200, description: 'Return all labresults.' })
  @ApiResponse({ status: 404, description: 'LabResults not found.' })
  async findAllLabResults() {
    return await this.labresultService.findAllLabResult();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('findById/:id')
  @ApiOperation({ summary: 'Get a labresult by its ID' })
  @ApiParam({ name: 'id', description: 'LabResult ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return the labresult with the given ID.',
  })
  @ApiResponse({ status: 404, description: 'LabResult not found.' })
  async findById(@Param('id') id: string) {
    return await this.labresultService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Change the labresult data' })
  @ApiParam({ name: 'id', description: 'LabResult ID', type: 'string' })
  @ApiBody({
    schema: {
      properties: {
        submissionFileUrl: { type: 'string', default: 'test' },
        score: { type: 'number', default: '0' },
        submittedAt: { type: 'Date', default: '01.04.2025' },
        userId: { type: 'string', default: '0' },
        labId: { type: 'string', default: '0' },
        userStatisticsId: { type: 'string', default: '0' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'labresult data has been changed.' })
  @ApiResponse({ status: 404, description: 'LabResult not found.' })
  async update(@Param('id') id: string, @Body() labresult: ILabResultEntity) {
    return await this.labresultService.updateLabResult(id, labresult);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a labresult by its ID' })
  @ApiParam({ name: 'id', description: 'LabResult ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The labresult has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'LabResult not found.' })
  async deleteLabResult(@Param('id') id: string) {
    await this.labresultService.deleteLabResult(id);
  }
}
