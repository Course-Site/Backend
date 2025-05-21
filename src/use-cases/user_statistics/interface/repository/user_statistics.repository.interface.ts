import { IUserStatisticsEntity } from 'src/entiies/user_statistics/interface/user_statistics.entity.interface';
import { ICreateUserStatisticsDto } from '../dto/create.user_statistics.dto.interface';

export interface IUserStatisticsRepository {
  createUserStatistics(
    data: ICreateUserStatisticsDto,
  ): Promise<IUserStatisticsEntity>;
  findAllUserStatistics(): Promise<IUserStatisticsEntity[]>;
  findById(id: string): Promise<IUserStatisticsEntity>;
  findByUserId(userId: string): Promise<IUserStatisticsEntity[]>;
  updateUserStatistics(
    id: string,
    userstatistics: Partial<IUserStatisticsEntity>,
  ): Promise<IUserStatisticsEntity>;
  deleteUserStatistics(id: string): Promise<void>;
  updateTestStatistics(userId: string, score: number): Promise<void>;
  updateLabStatistics(userId: string, score: number): Promise<void>;
}
