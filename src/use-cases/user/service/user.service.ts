import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserEntity } from 'src/entiies/user/interface/user.entity.interface';
import { IUserStatisticsService } from 'src/use-cases/user_statistics/interface/service/user_statistics.service.interface';
import { ICreateUserDto } from '../interface/dto/create.user.dto.interface';
import { IUserRepository } from '../interface/repository/user.repository.interface';
import { IUserService } from '../interface/service/user.service.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('userRepository')
    private readonly userRepository: IUserRepository,
    @Inject('userStatisticsService')
    private readonly userStatisticsService: IUserStatisticsService,
  ) {}

  async createUser(data: ICreateUserDto): Promise<IUserEntity> {
    const hash = bcrypt.hashSync(data.password, 10);

    const newUser = await this.userRepository.createUser({
      email: data.email,
      password: hash,
      name: data.name,
      role: data.role,
    });

    await this.userStatisticsService.createUserStatistics({
      userId: newUser.id,
      totalTestScore: 0,
      totalLabScore: 0,
      lastUpdated: new Date(),
    });
    return newUser;
  }

  async findAllUsers(): Promise<IUserEntity[]> {
    return await this.userRepository.findAllUsers();
  }

  async findById(id: string): Promise<IUserEntity> {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<IUserEntity> {
    return await this.userRepository.findByEmail(email);
  }

  async deleteUser(id: string): Promise<void> {
    try {
      return await this.userRepository.deleteUser(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
