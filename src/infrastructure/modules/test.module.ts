import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestController } from 'src/presintation/controllers/test.controller';
import { TestService } from 'src/use-cases/test/service/test.service';
import { TestRepository } from '../db/repositories/test.repository';
import { TestEntity } from '../db/entities/test.entity';
import { TopicEntity } from '../db/entities/topic.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TestEntity])],
  controllers: [TestController],
  providers: [
    {
      provide: 'testRepository',
      useClass: TestRepository,
    },
    {
      provide: 'testService',
      useClass: TestService,
    },
  ],
})
export class TestModule {}
