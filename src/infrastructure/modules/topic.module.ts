import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicController } from 'src/presintation/controllers/topic.controller';
import { TopicService } from 'src/use-cases/topic/service/topic.service';
import { TopicRepository } from '../db/repositories/topic.repository';
import { TopicEntity } from '../db/entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TopicEntity])],
  controllers: [TopicController],
  providers: [
    {
      provide: 'topicRepository',
      useClass: TopicRepository,
    },
    {
      provide: 'topicService',
      useClass: TopicService,
    },
  ],
})
export class TopicModule {}
