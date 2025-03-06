import { UserRole } from '../type/user.entity.type';
export interface IUserEntity 
{
  id?: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
}
