import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateUserDto } from 'src/use-cases/user/interface/dto/create.user.dto.interface';
import { IUserRepository } from 'src/use-cases/user/interface/repository/user.repository.interface';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { IUserEntity } from 'src/entiies/user/interface/user.entity.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(data: ICreateUserDto): Promise<IUserEntity> {
    try {
      const user = this.userRepository.create(data);
      return await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  async findAllUsers(): Promise<IUserEntity[]> 
  {
    try {
      return this.userRepository.find({  });
    } catch (error) {
      throw new Error('Users not found');
    }
  }

  async deleteUser(id: string): Promise<void> 
  {
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  findByEmail(email: string): Promise<IUserEntity> {
    try {
      return this.userRepository.findOneBy({ email });
    } catch (error) {
      throw new Error('User not found');
    }
  }

  async findById(userId: string): Promise<IUserEntity> {
    try {
      return this.userRepository.findOne({ where: { id: userId } });
    } catch (error) {
      throw new Error('User not found');
    }
  }
}
