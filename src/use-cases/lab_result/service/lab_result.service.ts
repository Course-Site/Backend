import { Inject, Injectable } from '@nestjs/common';
import { ILabResultService } from '../interface/service/lab_result.service.interface';
import { ILabResultRepository } from '../interface/repository/lab_result.repository.interface';
import { ILabResultEntity } from 'src/entiies/lab_result/interface/lab_result.entity.interface';
import { ICreateLabResultDto } from '../interface/dto/create.lab_result.dto.interface';

@Injectable()
export class LabResultService implements ILabResultService {
  constructor(
    @Inject('labresultRepository')
    private readonly labresultRepository: ILabResultRepository,
  ) {}

  async createLabResult(data: ICreateLabResultDto): Promise<ILabResultEntity> {
    return this.labresultRepository.createLabResult({
      submissionFileUrl: data.submissionFileUrl,
      score: data.score,
      submittedAt: data.submittedAt,
      userId: data.userId,
      labId: data.labId,
    });
  }

  async findAllLabResult(): Promise<ILabResultEntity[]> {
    return await this.labresultRepository.findAllLabResult();
  }

  async findById(id: string): Promise<ILabResultEntity> {
    return this.labresultRepository.findById(id);
  }

  async updateLabResult(
    id: string,
    LabResult: Partial<ILabResultEntity>,
  ): Promise<ILabResultEntity> {
    return await this.labresultRepository.updateLabResult(id, LabResult);
  }

  async deleteLabResult(id: string): Promise<void> {
    try {
      return await this.labresultRepository.deleteLabResult(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
