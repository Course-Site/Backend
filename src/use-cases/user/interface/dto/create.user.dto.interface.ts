import { UserRole } from 'src/entiies/user/enums/user-role.enum';
export interface ICreateUserDto {
  id?: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
}
