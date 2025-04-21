import { ICreateUserDto } from 'src/use-cases/user/interface/dto/create.user.dto.interface';
import { UserRole } from 'src/entiies/user/enums/user-role.enum';

export class CreateUserDto implements ICreateUserDto {
  id?: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
}
