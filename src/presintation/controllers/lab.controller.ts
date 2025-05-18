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
import { ILabEntity } from 'src/entiies/lab/lab/interface/lab.entity.interface';
import { UserRole } from 'src/entiies/user/enums/user-role.enum';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { RolesGuard } from 'src/infrastructure/JWT/guards/roles.guard';
import { ICreateLabDto } from 'src/use-cases/lab/lab/interface/dto/create.lab.dto.interface';
import { ILabService } from 'src/use-cases/lab/lab/interface/service/lab.service.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('lab')
@ApiTags('Lab')
export class LabController {
  constructor(
    @Inject('labService')
    private readonly labService: ILabService,
  ) {}

  @Roles(UserRole.ADMIN)
  @Post('create')
  @ApiOperation({ summary: 'Create a new lab' })
  @ApiBody({
    schema: {
      properties: {
        title: { type: 'string', default: 'test' },
        content: { type: 'string', default: 'test' },
        topicId: { type: 'string', default: 'test' },
        maxScore: { type: 'number', default: '5' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The lab has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createLab(@Body() data: ICreateLabDto) {
    return await this.labService.createLab(data);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all labs' })
  @ApiResponse({ status: 200, description: 'Return all labs.' })
  @ApiResponse({ status: 404, description: 'Labs not found.' })
  async findAllLabs() {
    return await this.labService.findAllLabs();
  }

  @Get('findById/:id')
  @ApiOperation({ summary: 'Get a lab by its ID' })
  @ApiParam({ name: 'id', description: 'Lab ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return the lab with the given ID.',
  })
  @ApiResponse({ status: 404, description: 'Lab not found.' })
  async findById(@Param('id') id: string) {
    return await this.labService.findById(id);
  }

  @Roles(UserRole.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Change the lab data' })
  @ApiParam({ name: 'id', description: 'Lab ID', type: 'string' })
  @ApiBody({
    schema: {
      properties: {
        title: { type: 'string', default: 'test' },
        content: { type: 'string', default: 'test' },
        topicId: { type: 'string', default: 'test' },
        maxScore: { type: 'number', default: '5' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'lab data has been changed.' })
  @ApiResponse({ status: 404, description: 'Lab not found.' })
  async update(@Param('id') id: string, @Body() lab: ILabEntity) {
    return await this.labService.updateLab(id, lab);
  }

  @Roles(UserRole.ADMIN)
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a lab by its ID' })
  @ApiParam({ name: 'id', description: 'Lab ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The lab has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Lab not found.' })
  async deleteLab(@Param('id') id: string) {
    await this.labService.deleteLab(id);
  }
}
