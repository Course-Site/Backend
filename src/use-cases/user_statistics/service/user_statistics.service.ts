import { Inject, Injectable, ForbiddenException } from '@nestjs/common';
import { IUserStatisticsService } from '../interface/service/user_statistics.service.interface';
import { IUserStatisticsRepository } from '../interface/repository/user_statistics.repository.interface';
import { IUserStatisticsEntity } from 'src/entiies/user_statistics/interface/user_statistics.entity.interface';
import { ICreateUserStatisticsDto } from '../interface/dto/create.user_statistics.dto.interface';


@Injectable()
export class UserStatisticsService implements IUserStatisticsService {
  constructor(
    @Inject('userstatisticsRepository')
    private readonly userstatisticsRepository: IUserStatisticsRepository,
  ) {}

  async createUserStatistics(data: ICreateUserStatisticsDto): Promise<IUserStatisticsEntity> {
    return this.userstatisticsRepository.createUserStatistics({
      totalTestScore: data.totalTestScore,
      totalLabScore: data.totalLabScore,
      lastUpdated: data.lastUpdated,
    });
  }

  async findAllUserStatistics(): Promise<IUserStatisticsEntity[]> {
      return await this.userstatisticsRepository.findAllUserStatistics();
    }
  
    async findById(id: string): Promise<IUserStatisticsEntity> {
      return this.userstatisticsRepository.findById(id);
    }
  
    async updateUserStatistics(id: string, userstatistics: Partial<IUserStatisticsEntity>): Promise<IUserStatisticsEntity>{
      return await this.userstatisticsRepository.updateUserStatistics(id, userstatistics);
    }
  
    async deleteUserStatistics(id: string): Promise<void> {
      try {
        return await this.userstatisticsRepository.deleteUserStatistics(id);
      } catch (error) {
        throw new Error(error);
      }
    }
}
