import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILabResultEntity } from 'src/entiies/lab/lab_result/interface/lab_result.entity.interface';
import { ICreateLabResultDto } from 'src/use-cases/lab/lab_result/interface/dto/create.lab_result.dto.interface';
import { ILabResultRepository } from 'src/use-cases/lab/lab_result/interface/repository/lab_result.repository.interface';
import { Repository } from 'typeorm';
import { LabResultEntity } from '../entities/lab_result.entity';

@Injectable()
export class LabResultRepository implements ILabResultRepository {
  constructor(
    @InjectRepository(LabResultEntity)
    private readonly labResultRepository: Repository<LabResultEntity>,
  ) {}

  async createLabResult(data: ICreateLabResultDto): Promise<ILabResultEntity> {
    try {
      const labresult = this.labResultRepository.create(data);
      return await this.labResultRepository.save(labresult);
    } catch (error) {
      throw error;
    }
  }

  async findAllLabResult(): Promise<ILabResultEntity[]> {
    try {
      return this.labResultRepository.find({});
    } catch (error) {
      throw new Error('LabResults not found');
    }
  }

  async findByLabAndUser(labId: string, userId: string) {
    return this.labResultRepository.find({
      where: {
        labId: labId,
        userId: userId,
      },
    });
  }

  async findByUserId(userId: string): Promise<ILabResultEntity[]> {
    try {
      return this.labResultRepository.find({
        where: { userId: userId },
      });
    } catch (error) {
      throw new Error('LabResults not found');
    }
  }

  async findById(labresultId: string): Promise<ILabResultEntity> {
    try {
      return this.labResultRepository.findOne({
        where: { id: labresultId },
      });
    } catch (error) {
      throw new Error('LabResult not found');
    }
  }

  async updateLabResult(
    id: string,
    labresult: Partial<ILabResultEntity>,
  ): Promise<ILabResultEntity> {
    try {
      await this.labResultRepository.update(id, labresult);
      return this.labResultRepository.findOne({ where: { id } });
    } catch {
      throw new Error('LabResult not found');
    }
  }

  async deleteLabResult(id: string): Promise<void> {
    try {
      await this.labResultRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
