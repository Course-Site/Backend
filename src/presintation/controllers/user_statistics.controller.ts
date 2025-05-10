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
import { IUserStatisticsService } from 'src/use-cases/user_statistics/interface/service/user_statistics.service.interface';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { ICreateUserStatisticsDto } from 'src/use-cases/user_statistics/interface/dto/create.user_statistics.dto.interface';
import { IUserStatisticsEntity } from 'src/entiies/user_statistics/interface/user_statistics.entity.interface';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { RolesGuard } from 'src/infrastructure/JWT/guards/roles.guard';
import { UserRole } from 'src/entiies/user/enums/user-role.enum';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('user_statistics')
@ApiTags('User_Statistics')
export class UserStatisticsController {
  constructor(
    @Inject('userStatisticsService')
    private readonly userStatisticsService: IUserStatisticsService,
  ) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('create')
  @ApiOperation({ summary: 'Create a new userstatistics' })
  @ApiBody({
    schema: {
      properties: {
        totalTestScore: { type: 'number', default: '0' },
        totalLabScore: { type: 'number', default: '0' },
        lastUpdated: { type: 'Date', default: '01.04.2025' },
        userId: { type: 'string', default: 'test' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The userstatistics has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createUserStatistics(@Body() data: ICreateUserStatisticsDto) {
    return await this.userStatisticsService.createUserStatistics(data);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all userstatisticss' })
  @ApiResponse({ status: 200, description: 'Return all userstatistics.' })
  @ApiResponse({ status: 404, description: 'UserStatistics not found.' })
  async findAllUserStatisticss() {
    return await this.userStatisticsService.findAllUserStatistics();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('findById/:id')
  @ApiOperation({ summary: 'Get a userstatistics by its ID' })
  @ApiParam({ name: 'id', description: 'UserStatistics ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return the userstatistics with the given ID.',
  })
  @ApiResponse({ status: 404, description: 'UserStatistics not found.' })
  async findById(@Param('id') id: string) {
    return await this.userStatisticsService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Change the userstatistics data' })
  @ApiParam({ name: 'id', description: 'UserStatistics ID', type: 'string' })
  @ApiBody({
    schema: {
      properties: {
        totalTestScore: { type: 'number', default: '0' },
        totalLabScore: { type: 'number', default: '0' },
        lastUpdated: { type: 'Date', default: '01.04.2025' },
        userId: { type: 'string', default: 'test' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'userstatistics data has been changed.',
  })
  @ApiResponse({ status: 404, description: 'UserStatistics not found.' })
  async update(
    @Param('id') id: string,
    @Body() userstatistics: IUserStatisticsEntity,
  ) {
    return await this.userStatisticsService.updateUserStatistics(
      id,
      userstatistics,
    );
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a userstatistics by its ID' })
  @ApiParam({ name: 'id', description: 'UserStatistics ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The userstatistics has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'UserStatistics not found.' })
  async deleteUserStatistics(@Param('id') id: string) {
    await this.userStatisticsService.deleteUserStatistics(id);
  }
}
