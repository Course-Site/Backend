import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateUserStatisticsDto } from 'src/use-cases/user_statistics/interface/dto/create.user_statistics.dto.interface';
import { IUserStatisticsRepository } from 'src/use-cases/user_statistics/interface/repository/user_statistics.repository.interface';
import { UserStatisticsEntity } from '../entities/user_statistics.entity';
import { Repository } from 'typeorm';
import { IUserStatisticsEntity } from 'src/entiies/user_statistics/interface/user_statistics.entity.interface';

@Injectable()
export class UserStatisticsRepository implements IUserStatisticsRepository {
  constructor(
    @InjectRepository(UserStatisticsEntity)
    private readonly userstatisticsRepository: Repository<UserStatisticsEntity>,
  ) {}

  async createUserStatistics(
    data: ICreateUserStatisticsDto,
  ): Promise<IUserStatisticsEntity> {
    try {
      const userstatistics = this.userstatisticsRepository.create(data);
      return await this.userstatisticsRepository.save(userstatistics);
    } catch (error) {
      throw error;
    }
  }

  async findAllUserStatistics(): Promise<IUserStatisticsEntity[]> {
    try {
      return this.userstatisticsRepository.find({});
    } catch (error) {
      throw new Error('UserStatisticss not found');
    }
  }

  async findById(userstatisticsId: string): Promise<IUserStatisticsEntity> {
    try {
      return this.userstatisticsRepository.findOne({
        where: { id: userstatisticsId },
      });
    } catch (error) {
      throw new Error('UserStatistics not found');
    }
  }

  async updateUserStatistics(
    id: string,
    userstatistics: Partial<IUserStatisticsEntity>,
  ): Promise<IUserStatisticsEntity> {
    try {
      await this.userstatisticsRepository.update(id, userstatistics);
      return this.userstatisticsRepository.findOne({ where: { id } });
    } catch {
      throw new Error('UserStatistics not found');
    }
  }

  async deleteUserStatistics(id: string): Promise<void> {
    try {
      await this.userstatisticsRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
