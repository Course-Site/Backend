import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationController } from 'src/presintation/controllers/application.controller';
import { ApplicationService } from 'src/use-cases/application/service/application.service';
import { ApplicationRepository } from '../db/repositories/application.repository';
import { ApplicationEntity } from '../db/entities/application.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ApplicationEntity])],
  controllers: [ApplicationController],
  providers: [
    {
      provide: 'applicationRepository',
      useClass: ApplicationRepository,
    },
    {
      provide: 'applicationService',
      useClass: ApplicationService,
    },
  ],
})
export class ApplicationModule {}
