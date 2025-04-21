import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabController } from 'src/presintation/controllers/lab.controller';
import { LabService } from 'src/use-cases/lab/service/lab.service';
import { LabRepository } from '../db/repositories/lab.repository';
import { LabEntity } from '../db/entities/lab.entity';
import { TopicEntity } from '../db/entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LabEntity])],
  controllers: [LabController],
  providers: [
    {
      provide: 'labRepository',
      useClass: LabRepository,
    },
    {
      provide: 'labService',
      useClass: LabService,
    },
  ],
})
export class labModule {}
