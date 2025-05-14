import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTestStatisticsEntity } from '../entities/user_test_statistics.entity';
import { IUserTestStatisticsEntity } from 'src/entiies/user_test_statistics/interface/user_test_statistics.entity.interface';

@Injectable()
export class UserTestStatisticsRepository {
  constructor(
    @InjectRepository(UserTestStatisticsEntity)
    private readonly userTestStatisticsRepository: Repository<UserTestStatisticsEntity>,
  ) {}

  async findByUserAndTest(userId: string, testId: string) {
    return this.userTestStatisticsRepository.findOne({
      where: { userId, testId },
    });
  }

  async createOrUpdate(
    userId: string,
    testId: string,
    score: number,
  ): Promise<UserTestStatisticsEntity> {
    let record = await this.findByUserAndTest(userId, testId);

    if (!record) {
      record = this.userTestStatisticsRepository.create({
        userId,
        testId,
        calculatedScore: score,
        lastUpdated: new Date(),
      });
    } else {
      record.calculatedScore = score;
      record.lastUpdated = new Date();
    }

    return this.userTestStatisticsRepository.save(record);
  }

  async findAllByUserId(userId: string): Promise<IUserTestStatisticsEntity[]> {
    try {
      return await this.userTestStatisticsRepository.find({
        where: { userId },
      });
    } catch (error) {
      throw new Error('UserTestStatistics not found');
    }
  }

  async findAllUserTestStatistics(): Promise<IUserTestStatisticsEntity[]> {
    try {
      return this.userTestStatisticsRepository.find({});
    } catch (error) {
      throw new Error('UserStatistics not found');
    }
  }

  async findById(userstatisticsId: string): Promise<IUserTestStatisticsEntity> {
    try {
      return this.userTestStatisticsRepository.findOne({
        where: { id: userstatisticsId },
      });
    } catch (error) {
      throw new Error('UserStatistics not found');
    }
  }

  async deleteUserStatistics(id: string): Promise<void> {
    try {
      await this.userTestStatisticsRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
