import { ICreateUserDto } from 'src/use-cases/user/interface/dto/create.user.dto.interface';
import { UserRole } from 'src/entiies/user/type/user.entity.type';

export class CreateUserDto implements ICreateUserDto 
{
  email: string;
  password: string;
  name: string;
  role: UserRole;
}
