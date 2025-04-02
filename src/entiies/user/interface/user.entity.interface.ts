import { UserRole } from '../enums/user-role.enum';

export interface IUserEntity {
  id?: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
}
