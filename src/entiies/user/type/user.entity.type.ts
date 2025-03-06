export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export type TUserEntity = 
{
  id?: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
};