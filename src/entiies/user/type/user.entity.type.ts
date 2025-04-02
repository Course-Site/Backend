import { UserRole } from '../enums/user-role.enum';

export type TUserEntity = {
  id?: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
};
