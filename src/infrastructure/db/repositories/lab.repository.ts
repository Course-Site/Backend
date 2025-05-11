import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateLabDto } from 'src/use-cases/lab/lab/interface/dto/create.lab.dto.interface';
import { ILabRepository } from 'src/use-cases/lab/lab/interface/repository/lab.repository.interface';
import { LabEntity } from '../entities/lab.entity';
import { Repository } from 'typeorm';
import { ILabEntity } from 'src/entiies/lab/interface/lab.entity.interface';

@Injectable()
export class LabRepository implements ILabRepository {
  constructor(
    @InjectRepository(LabEntity)
    private readonly labRepository: Repository<LabEntity>,
  ) {}

  async createLab(data: ICreateLabDto): Promise<ILabEntity> {
    try {
      const lab = this.labRepository.create(data);
      return await this.labRepository.save(lab);
    } catch (error) {
      throw error;
    }
  }

  async findAllLabs(): Promise<ILabEntity[]> {
    try {
      return this.labRepository.find({});
    } catch (error) {
      throw new Error('Labs not found');
    }
  }

  async findById(labId: string): Promise<ILabEntity> {
    try {
      return this.labRepository.findOne({ where: { id: labId } });
    } catch (error) {
      throw new Error('Lab not found');
    }
  }

  async updateLab(id: string, lab: Partial<ILabEntity>): Promise<ILabEntity> {
    try {
      await this.labRepository.update(id, lab);
      return this.labRepository.findOne({ where: { id } });
    } catch {
      throw new Error('Lab not found');
    }
  }

  async deleteLab(id: string): Promise<void> {
    try {
      await this.labRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
