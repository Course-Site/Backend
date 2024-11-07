import { IUserEntity } from 'src/entiies/user/interface/user.entity.interface';
import { CreateUserDto } from 'src/presintation/dto/user/create.user.dto';

export interface IAuthService {
  validateUser(
    email: string,
    password: string,
  ): Promise<{
    id?: string;
    email: string;
    name: string;
  } | null>;
  signUp(data: CreateUserDto): Promise<{ token: string }>;
  signIn(data: any): Promise<{ token: string }>;
}
