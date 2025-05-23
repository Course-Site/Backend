import { IUserEntity } from 'src/entiies/user/interface/user.entity.interface';
import { ICreateUserDto } from '../dto/create.user.dto.interface';

export interface IUserService {
  createUser(data: ICreateUserDto): Promise<IUserEntity>;
  findAllUsers(): Promise<IUserEntity[]>;
  findById(id: string): Promise<IUserEntity>;
  findByEmail(email: string): Promise<IUserEntity>;
  deleteUser(id: string): Promise<void>;
}
