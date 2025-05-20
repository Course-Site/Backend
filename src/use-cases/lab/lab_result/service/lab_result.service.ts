import { Inject, Injectable } from '@nestjs/common';
import { ILabResultEntity } from 'src/entiies/lab/lab_result/interface/lab_result.entity.interface';
import { IUserStatisticsService } from 'src/use-cases/user_statistics/interface/service/user_statistics.service.interface';
import { ILabRepository } from '../../lab/interface/repository/lab.repository.interface';
import { ICreateLabResultDto } from '../interface/dto/create.lab_result.dto.interface';
import { ILabResultRepository } from '../interface/repository/lab_result.repository.interface';
import { ILabResultService } from '../interface/service/lab_result.service.interface';

@Injectable()
export class LabResultService implements ILabResultService {
  constructor(
    @Inject('labResultRepository')
    private readonly labResultRepository: ILabResultRepository,
    @Inject('labRepository')
    private readonly labRepository: ILabRepository,
    @Inject('userStatisticsService')
    private readonly userStatisticsService: IUserStatisticsService,
  ) {}

  async createLabResult(data: ICreateLabResultDto): Promise<ILabResultEntity> {
    await this.userStatisticsService.updateLabStatistics(
      data.userId,
      data.score,
    );
    const lab = await this.labRepository.findById(data.labId);
    const percent = (data.score / lab.maxScore) * 100;
    return this.labResultRepository.createLabResult({
      submissionFileUrl: data.submissionFileUrl,
      score: data.score,
      percentage: percent,
      userId: data.userId,
      labId: data.labId,
    });
  }

  async findAllLabResult(): Promise<ILabResultEntity[]> {
    return await this.labResultRepository.findAllLabResult();
  }

  async findByLabAndUser(
    labId: string,
    userId: string,
  ): Promise<ILabResultEntity[]> {
    return this.labResultRepository.findByLabAndUser(labId, userId);
  }

  async findById(id: string): Promise<ILabResultEntity> {
    return this.labResultRepository.findById(id);
  }

  async updateLabResult(
    id: string,
    labResult: Partial<ILabResultEntity>,
  ): Promise<ILabResultEntity> {
    const oldLabResult = await this.labResultRepository.findById(id);

    if (labResult.score !== undefined) {
      const lab = await this.labRepository.findById(oldLabResult.labId);
      const newPercentage = (labResult.score / lab.maxScore) * 100;
      labResult.percentage = newPercentage;
    }

    const updatedLabResult = await this.labResultRepository.updateLabResult(
      id,
      labResult,
    );
    if (updatedLabResult.userId && updatedLabResult.score !== undefined) {
      const scoreDifference =
        (updatedLabResult.score || 0) - (oldLabResult.score || 0);
      await this.userStatisticsService.updateLabStatistics(
        updatedLabResult.userId,
        scoreDifference,
      );
    }
    return updatedLabResult;
  }

  async deleteLabResult(id: string): Promise<void> {
    try {
      return await this.labResultRepository.deleteLabResult(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
