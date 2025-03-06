import { UserRole } from 'src/entiies/user/type/user.entity.type';
export interface ICreateUserDto 
{
  id?: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
}
