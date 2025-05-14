import { Inject, Injectable } from '@nestjs/common';
import { IUserStatisticsService } from '../interface/service/user_statistics.service.interface';
import { IUserStatisticsRepository } from '../interface/repository/user_statistics.repository.interface';
import { IUserStatisticsEntity } from 'src/entiies/user_statistics/interface/user_statistics.entity.interface';
import { ICreateUserStatisticsDto } from '../interface/dto/create.user_statistics.dto.interface';
import { IUserTestStatisticsRepository } from 'src/use-cases/user_test_statistics/interface/repository/user_test_statistics.repository.interface';

@Injectable()
export class UserStatisticsService implements IUserStatisticsService {
  constructor(
    @Inject('userStatisticsRepository')
    private readonly userStatisticsRepository: IUserStatisticsRepository,
    @Inject('userTestStatisticsRepository')
    private readonly userTestStatisticsRepository: IUserTestStatisticsRepository,
  ) {}

  async createUserStatistics(
    data: ICreateUserStatisticsDto,
  ): Promise<IUserStatisticsEntity> {
    const result = this.userStatisticsRepository.createUserStatistics({
      totalTestScore: data.totalTestScore,
      totalLabScore: data.totalLabScore,
      lastUpdated: data.lastUpdated,
      userId: data.userId,
    });
    return result;
  }

  async recalculateTestStatistic(
    userId: string,
  ): Promise<IUserStatisticsEntity | void> {
    const stats =
      await this.userTestStatisticsRepository.findAllByUserId(userId);
    if (stats.length === 0) return;

    const totalScore = stats.reduce(
      (sum, stat) => sum + stat.calculatedScore,
      0,
    );

    return this.userStatisticsRepository.updateTestStatistics(
      userId,
      totalScore,
    );
  }

  async findAllUserStatistics(): Promise<IUserStatisticsEntity[]> {
    return await this.userStatisticsRepository.findAllUserStatistics();
  }

  async findById(id: string): Promise<IUserStatisticsEntity> {
    return this.userStatisticsRepository.findById(id);
  }

  async updateUserStatistics(
    id: string,
    userstatistics: Partial<IUserStatisticsEntity>,
  ): Promise<IUserStatisticsEntity> {
    return await this.userStatisticsRepository.updateUserStatistics(
      id,
      userstatistics,
    );
  }

  async deleteUserStatistics(id: string): Promise<void> {
    try {
      return await this.userStatisticsRepository.deleteUserStatistics(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateTestStatistics(userId: string, score: number): Promise<void> {
    try {
      return await this.userStatisticsRepository.updateTestStatistics(
        userId,
        score,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateLabStatistics(userId: string, score: number): Promise<void> {
    try {
      return await this.userStatisticsRepository.updateLabStatistics(
        userId,
        score,
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
