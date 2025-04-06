import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateLabResultDto } from 'src/use-cases/lab_result/interface/dto/create.lab_result.dto.interface';
import { ILabResultRepository } from 'src/use-cases/lab_result/interface/repository/lab_result.repository.interface';
import { LabResultEntity } from '../entities/lab_result.entity';
import { Repository } from 'typeorm';
import { ILabResultEntity } from 'src/entiies/lab_result/interface/lab_result.entity.interface';

@Injectable()
export class LabResultRepository implements ILabResultRepository {
  constructor(
    @InjectRepository(LabResultEntity)
    private readonly labresultRepository: Repository<LabResultEntity>,
  ) {}

  async createLabResult(data: ICreateLabResultDto): Promise<ILabResultEntity> {
    try {
      const labresult = this.labresultRepository.create(data);
      return await this.labresultRepository.save(labresult);
    } catch (error) {
      throw error;
    }
  }

  async findAllLabResult(): Promise<ILabResultEntity[]> {
    try {
      return this.labresultRepository.find({});
    } catch (error) {
      throw new Error('LabResults not found');
    }
  }

  async findById(labresultId: string): Promise<ILabResultEntity> {
    try {
      return this.labresultRepository.findOne({ where: { id: labresultId } });
    } catch (error) {
      throw new Error('LabResult not found');
    }
  }

  async updateLabResult(
    id: string,
    labresult: Partial<ILabResultEntity>,
  ): Promise<ILabResultEntity> {
    try {
      await this.labresultRepository.update(id, labresult);
      return this.labresultRepository.findOne({ where: { id } });
    } catch {
      throw new Error('LabResult not found');
    }
  }

  async deleteLabResult(id: string): Promise<void> {
    try {
      await this.labresultRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
