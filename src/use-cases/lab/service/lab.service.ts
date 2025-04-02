import { Inject, Injectable } from '@nestjs/common';
import { ILabService } from '../interface/service/lab.service.interface';
import { ILabRepository } from '../interface/repository/lab.repository.interface';
import { ILabEntity } from 'src/entiies/lab/interface/lab.entity.interface';
import { ICreateLabDto } from '../interface/dto/create.lab.dto.interface';

@Injectable()
export class LabService implements ILabService {
  constructor(
    @Inject('labRepository')
    private readonly labRepository: ILabRepository,
  ) {}

  async createLab(data: ICreateLabDto): Promise<ILabEntity> {

    return this.labRepository.createLab({
	  title: data.title,
	  description: data.description,
	  guidelineFileUrl: data.guidelineFileUrl,
    });
  }

  async findAllLabs(): Promise<ILabEntity[]> {
    return await this.labRepository.findAllLabs();
  }

  async findById(id: string): Promise<ILabEntity> {
    return await this.labRepository.findById(id);
  }

  async updateLab(id: string, lab: Partial<ILabEntity>): Promise<ILabEntity>{
    return await this.labRepository.updateLab(id, lab);
  }
  
  async deleteLab(id: string): Promise<void> {
    try {
      return await this.labRepository.deleteLab(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}