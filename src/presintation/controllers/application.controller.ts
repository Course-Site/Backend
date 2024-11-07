import { Controller, Get, Delete, Put, Inject, Param, Post, Body, UseGuards } from '@nestjs/common';
import { IApplicationService } from 'src/use-cases/application/interface/service/application.service.interface';
import { 
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { Response } from 'express';
import { ICreateApplicationDto } from 'src/use-cases/application/interface/dto/create.application.dto.interface';
import { IApplicationEntity } from 'src/entiies/application/interface/application.entity.interface';


@Controller('application')
@ApiTags('Application')
export class ApplicationController {
  constructor(
    @Inject('applicationService')
    private readonly applicationService: IApplicationService,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new application' })
  @ApiConsumes('application/json')
  @ApiBody({
    schema: {
      properties: {
        typeOfLearning: { type: 'string', default: 'test' },
        fullName: { type: 'string', default: 'test' },
        age: { type: 'string', default: 'test' },
        city: { type: 'string', default: 'test' },
        specialty: { type: 'string', default: 'test' },
        parentsName: { type: 'string', default: 'test' },
        phone: { type: 'string', default: 'test' },
        email: { type: 'string', default: 'test' },
        url: { type: 'string', default: 'test' },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'The application has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createApplication(@Body() data: ICreateApplicationDto) {
    return await this.applicationService.createApplication(data)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('get')
  @ApiOperation({ summary: 'Get all applications' })
  @ApiResponse({ status: 200, description: 'Return all applications.' })
  @ApiResponse({ status: 404, description: 'Applications not found.' })
  async findAllApplications() {
    return await this.applicationService.findAllApplications()
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a application by its ID' })
  @ApiParam({ name: 'id', description: 'Application ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'The application has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Application not found.' })
  async deleteApplication(@Param('id') id: string) {
    await this.applicationService.deleteApplication(id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put(':id')
  @ApiOperation({ summary: 'Change the application data' })
  @ApiParam({ name: 'id', description: 'Application ID', type: 'string' })
  @ApiBody({
    schema: {
      properties: {
        typeOfLearning: { type: 'string', default: 'test' },
        fullName: { type: 'string', default: 'test' },
        age: { type: 'string', default: 'test' },
        city: { type: 'string', default: 'test' },
        specialty: { type: 'string', default: 'test' },
        parentsName: { type: 'string', default: 'test' },
        phone: { type: 'string', default: 'test' },
        email: { type: 'string', default: 'test' },
        url: { type: 'string', default: 'test' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'application data has been changed.' })
  @ApiResponse({ status: 404, description: 'Application not found.' })
  async update(@Param('id') id: string, @Body() application: IApplicationEntity) {
    return await this.applicationService.update(id, application)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('findById/:id')
  @ApiOperation({ summary: 'Get a application by its ID' })
  @ApiParam({ name: 'id', description: 'Application ID', type: 'string' })
  @ApiResponse({ status: 200, description: 'Return the application with the given ID.' })
  @ApiResponse({ status: 404, description: 'Application not found.' })
  async findById(@Param('id') id: string) {
    return await this.applicationService.findById(id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('findByName/:fullName')
  @ApiOperation({ summary: 'Get a application by its Name' })
  @ApiParam({ name: 'fullName', description: 'Application fullName', type: 'string' })
  @ApiResponse({ status: 200, description: 'Return the application with the given fullname.' })
  @ApiResponse({ status: 404, description: 'Application not found.' })
  async findByName(@Param('fullName') fullName: string) {
      return await this.applicationService.findByName(fullName)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('findByEmail/:email')
  @ApiOperation({ summary: 'Get a application by its email' })
  @ApiParam({ name: 'email', description: 'Application email', type: 'string' })
  @ApiResponse({ status: 200, description: 'Return the application with the given email.' })
  @ApiResponse({ status: 404, description: 'Application not found.' })
  async findByEmail(@Param('email') email: string) {
      return await this.applicationService.findByEmail(email);
  };
}
