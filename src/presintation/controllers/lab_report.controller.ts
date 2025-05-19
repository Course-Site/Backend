import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Inject,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileType } from 'src/entiies/lab/lab_report/enums/file_type.enum';
import { mimeToFileType } from 'src/use-cases/lab/lab_report/file_upload.config/file-type.utils';
import { multerConfig } from 'src/use-cases/lab/lab_report/file_upload.config/file-upload.config';
import { ILabReportService } from 'src/use-cases/lab/lab_report/interface/service/lab_report.service.interface';
import * as iconv from 'iconv-lite';

@Controller('lab-reports')
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
}
