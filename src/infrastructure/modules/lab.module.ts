import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabController } from 'src/presintation/controllers/lab.controller';
import { LabService } from 'src/use-cases/lab/service/lab.service';
import { LabRepository } from '../db/repositories/lab.repository';
import { LabEntity } from '../db/entities/lab.entity';
import { TopicRepository } from '../db/repositories/topic.repository';
import { TopicEntity } from '../db/entities/topic.entity'
import { LabResultEntity } from '../db/entities/lab_result.entity'
import { LabResultRepository } from '../db/repositories/lab_result.repository'

@Module({
  imports: [TypeOrmModule.forFeature([LabEntity]), TopicEntity],
  controllers: [LabController],
  providers: [
	{
	  provide: 'labRepository',
	  useClass: LabRepository,
	},
	{
	  provide: 'labService',
	  useClass: LabService,
	}
  ],
})
export class labModule {}
