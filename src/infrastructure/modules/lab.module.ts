import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabController } from 'src/presintation/controllers/lab.controller';
import { LabService } from 'src/use-cases/lab/lab/service/lab.service';
import { LabRepository } from '../db/repositories/lab.repository';
import { LabEntity } from '../db/entities/lab.entity';

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
  exports: ['labRepository'],
})
export class labModule {}
