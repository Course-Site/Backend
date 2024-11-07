import { Inject, Injectable } from '@nestjs/common';
import { IApplicationService } from '../interface/service/application.service.interface';
import { IApplicationRepository } from '../interface/repository/application.repository.interface';
import { IApplicationEntity } from 'src/entiies/application/interface/application.entity.interface';
import { ICreateApplicationDto } from '../interface/dto/create.application.dto.interface';

@Injectable()
export class ApplicationService implements IApplicationService {
  constructor(
    @Inject('applicationRepository')
    private readonly applicationRepository: IApplicationRepository,
  ) {}

  async createApplication(data: ICreateApplicationDto): Promise<IApplicationEntity> {

    return this.applicationRepository.createApplication({
      status: "Новый",
      typeOfLearning: data.typeOfLearning,
      fullName: data.fullName,
      age: data.age,
      city: data.city,
      specialty: data.specialty,
      parentsName: data.parentsName,
      phone: data.phone,
      email: data.email,
      url: data.url,
    });
  }

  async findAllApplications(): Promise<IApplicationEntity[]> {
    return await this.applicationRepository.findAllApplications();
  }

  async deleteApplication(id: string): Promise<void> {
    try {
      return await this.applicationRepository.deleteApplication(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: string, application: Partial<IApplicationEntity>): Promise<IApplicationEntity>{
    return await this.applicationRepository.update(id, application);
  }

  async findById(id: string): Promise<IApplicationEntity> {
    return await this.applicationRepository.findById(id);
  }

  async findByName(fullName: string): Promise<IApplicationEntity> {
    return await this.applicationRepository.findByName(fullName);
  }

  async findByEmail(email: string): Promise<IApplicationEntity> {
    return await this.applicationRepository.findByEmail(email);
  }
}
