import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestController } from 'src/presintation/controllers/test.controller';
import { TestService } from 'src/use-cases/test/test/service/test.service';
import { TestEntity } from '../db/entities/test.entity';
import { TestRepository } from '../db/repositories/test.repository';

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
  exports: ['testRepository'],
})
export class TestModule {}
