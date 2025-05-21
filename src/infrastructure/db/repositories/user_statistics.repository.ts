import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IUserStatisticsEntity } from 'src/entiies/user_statistics/interface/user_statistics.entity.interface';
import { ICreateUserStatisticsDto } from 'src/use-cases/user_statistics/interface/dto/create.user_statistics.dto.interface';
import { IUserStatisticsRepository } from 'src/use-cases/user_statistics/interface/repository/user_statistics.repository.interface';
import { Repository } from 'typeorm';
import { UserStatisticsEntity } from '../entities/user_statistics.entity';

@Injectable()
export class UserStatisticsRepository implements IUserStatisticsRepository {
  constructor(
    @InjectRepository(UserStatisticsEntity)
    private readonly userStatisticsRepository: Repository<UserStatisticsEntity>,
  ) {}

  async createUserStatistics(
    data: ICreateUserStatisticsDto,
  ): Promise<IUserStatisticsEntity> {
    try {
      const userstatistics = this.userStatisticsRepository.create(data);
      const savedStatistics =
        await this.userStatisticsRepository.save(userstatistics);
      return savedStatistics;
    } catch (error) {
      throw error;
    }
  }

  async findAllUserStatistics(): Promise<IUserStatisticsEntity[]> {
    try {
      return this.userStatisticsRepository.find({});
    } catch (error) {
      throw new Error('UserStatistics not found');
    }
  }

  async findById(userstatisticsId: string): Promise<IUserStatisticsEntity> {
    try {
      return this.userStatisticsRepository.findOne({
        where: { id: userstatisticsId },
      });
    } catch (error) {
      throw new Error('UserStatistics not found');
    }
  }

  async findByUserId(userId: string): Promise<IUserStatisticsEntity[]> {
    try {
      return this.userStatisticsRepository.find({
        where: { userId: userId },
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
      await this.userStatisticsRepository.update(id, userstatistics);
      return this.userStatisticsRepository.findOne({ where: { id } });
    } catch {
      throw new Error('UserStatistics not found');
    }
  }

  async deleteUserStatistics(id: string): Promise<void> {
    try {
      await this.userStatisticsRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateTestStatistics(userId: string, newScore: number): Promise<void> {
    await this.userStatisticsRepository
      .createQueryBuilder()
      .update(UserStatisticsEntity)
      .set({
        totalTestScore: newScore,
        lastUpdated: new Date(),
      })
      .where('userId = :userId', { userId })
      .execute();
  }

  async updateLabStatistics(userId: string, score: number): Promise<void> {
    await this.userStatisticsRepository
      .createQueryBuilder()
      .update(UserStatisticsEntity)
      .set({
        totalLabScore: () => `"totalLabScore" + ${score}`,
        lastUpdated: new Date(),
      })
      .where('userId = :userId', { userId })
      .execute();
  }
}
