import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Inject,
  UseGuards,
  Get,
  Query,
  Param,
  NotFoundException,
  StreamableFile,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileType } from 'src/entiies/lab/lab_report/enums/file_type.enum';
import { mimeToFileType } from 'src/use-cases/lab/lab_report/file_upload.config/file-type.utils';
import { multerConfig } from 'src/use-cases/lab/lab_report/file_upload.config/file-upload.config';
import { ILabReportService } from 'src/use-cases/lab/lab_report/interface/service/lab_report.service.interface';
import * as iconv from 'iconv-lite';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { RolesGuard } from 'src/infrastructure/JWT/guards/roles.guard';
import { UserRole } from 'src/entiies/user/enums/user-role.enum';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { createReadStream, existsSync } from 'fs';
import { basename } from 'path';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('lab_report')
@ApiTags('Lab Report')
export class LabReportController {
  constructor(
    @Inject('labReportService')
    private readonly labReportService: ILabReportService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @ApiOperation({ summary: 'Upload lab report' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Lab report file with metadata',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'File to upload (PDF, DOC, DOCX, ZIP)',
        },
        labId: {
          type: 'string',
          example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          description: 'ID of the lab',
        },
        userId: {
          type: 'string',
          example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          description: 'ID of the user',
        },
      },
      required: ['file', 'labId', 'userId'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'File successfully uploaded',
    schema: {
      example: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        filename: 'report.pdf',
        filetype: FileType.PDF,
        size: 1024,
        labId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        userId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        uploadedAt: '2023-05-20T12:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Invalid file type' })
  @ApiResponse({ status: 413, description: 'File too large' })
  async uploadLabReport(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { labId: string; userId: string },
  ) {
    const buffer = Buffer.from(file.originalname, 'binary');
    const decodedFilename = iconv.decode(buffer, 'utf8'); // или 'win1251'

    const fileType = mimeToFileType(file.mimetype);

    return this.labReportService.createLabReport({
      filename: decodedFilename,
      filepath: file.path,
      filetype: fileType,
      size: file.size,
      userId: body.userId,
      labId: body.labId,
    });
  }

  @Get('download')
  @ApiOperation({ summary: 'Download lab report by labId and userId' })
  @ApiQuery({
    name: 'labId',
    type: 'string',
    required: true,
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @ApiQuery({
    name: 'userId',
    type: 'string',
    required: true,
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @ApiResponse({ status: 200, description: 'File download started' })
  @ApiResponse({ status: 404, description: 'Lab report not found' })
  @ApiResponse({
    status: 500,
    description: 'Internal server error while streaming file',
  })
  async downloadByLabAndUser(
    @Query('labId') labId: string,
    @Query('userId') userId: string,
  ): Promise<StreamableFile> {
    const reports = await this.labReportService.findByLabAndUser(labId, userId);

    if (!reports || reports.length === 0) {
      throw new NotFoundException('Лабораторный отчет не найден');
    }

    const report = reports[0]; // Если нужен первый найденный файл — можно адаптировать под выбор всех

    if (!report.filepath || !existsSync(report.filepath)) {
      throw new NotFoundException('Файл не найден на сервере');
    }

    try {
      const fileStream = createReadStream(report.filepath);
      const filename = basename(report.filename);

      return new StreamableFile(fileStream, {
        type: 'application/octet-stream',
        disposition: `attachment; filename="${encodeURIComponent(filename)}"`,
      });
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при открытии файла');
    }
  }

  @Roles(UserRole.ADMIN)
  @Get('getAll')
  @ApiOperation({ summary: 'Get all labReports' })
  @ApiResponse({ status: 200, description: 'Return all labReports.' })
  @ApiResponse({ status: 404, description: 'LabReports not found.' })
  async findAllLabReports() {
    return await this.labReportService.findAllLabReport();
  }

  @Get('findById/:id')
  @ApiOperation({ summary: 'Get a labReport by its ID' })
  @ApiParam({ name: 'id', description: 'LabReport ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return the labReport with the given ID.',
  })
  @ApiResponse({ status: 404, description: 'LabReport not found.' })
  async findById(@Param('id') id: string) {
    return await this.labReportService.findById(id);
  }

  @Get('GetByLabAndUser')
  @ApiOperation({ summary: 'Get the labreport' })
  @ApiQuery({
    name: 'labId',
    type: 'string',
    required: true,
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @ApiQuery({
    name: 'userId',
    type: 'string',
    required: true,
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @ApiResponse({
    status: 200,
    description: 'The labReport has been successfully returned',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async findByLabAndUser(
    @Query('labId') labId: string,
    @Query('userId') userId: string,
  ) {
    return await this.labReportService.findByLabAndUser(labId, userId);
  }
}
