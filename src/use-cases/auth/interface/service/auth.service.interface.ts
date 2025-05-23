import { UserRole } from 'src/entiies/user/enums/user-role.enum';
import { CreateUserDto } from 'src/presintation/dto/user/create.user.dto';

export interface IAuthService {
  validateUser(
    email: string,
    password: string,
  ): Promise<{
    id?: string;
    email: string;
    name: string;
    role?: UserRole;
  } | null>;
  signUp(data: CreateUserDto): Promise<{ token: string; id: string }>;
  signIn(data: any): Promise<{ token: string }>;
}
