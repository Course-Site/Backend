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
import { ITopicEntity } from 'src/entiies/topic/interface/topic.entity.interface';
import { UserRole } from 'src/entiies/user/enums/user-role.enum';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { RolesGuard } from 'src/infrastructure/JWT/guards/roles.guard';
import { ICreateTopicDto } from 'src/use-cases/topic/interface/dto/create.topic.dto.interface';
import { ITopicService } from 'src/use-cases/topic/interface/service/topic.service.interface';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
@Controller('topic')
@ApiTags('Topic')
export class TopicController {
  constructor(
    @Inject('topicService')
    private readonly topicService: ITopicService,
  ) {}

  @Roles(UserRole.ADMIN)
  @Post('create')
  @ApiOperation({ summary: 'Create a new topic' })
  @ApiBody({
    schema: {
      properties: {
        title: { type: 'string', default: 'test' },
        description: { type: 'string', default: 'test' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The topic has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createTopic(@Body() data: ICreateTopicDto) {
    return await this.topicService.createTopic(data);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Get all topics' })
  @ApiResponse({ status: 200, description: 'Return all topics.' })
  @ApiResponse({ status: 404, description: 'Topics not found.' })
  async findAllTopics() {
    return await this.topicService.findAllTopics();
  }

  @Get('findById/:id')
  @ApiOperation({ summary: 'Get a topic by its ID' })
  @ApiParam({ name: 'id', description: 'Topic ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Return the topic with the given ID.',
  })
  @ApiResponse({ status: 404, description: 'Topic not found.' })
  async findById(@Param('id') id: string) {
    return await this.topicService.findById(id);
  }

  @Roles(UserRole.ADMIN)
  @Put(':id')
  @ApiOperation({ summary: 'Change the topic data' })
  @ApiParam({ name: 'id', description: 'Topic ID', type: 'string' })
  @ApiBody({
    schema: {
      properties: {
        title: { type: 'string', default: 'test' },
        description: { type: 'string', default: 'test' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'topic data has been changed.' })
  @ApiResponse({ status: 404, description: 'Topic not found.' })
  async update(@Param('id') id: string, @Body() topic: ITopicEntity) {
    return await this.topicService.updateTopic(id, topic);
  }

  @Roles(UserRole.ADMIN)
  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a topic by its ID' })
  @ApiParam({ name: 'id', description: 'Topic ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The topic has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'Topic not found.' })
  async deleteTopic(@Param('id') id: string) {
    await this.topicService.deleteTopic(id);
  }
}
