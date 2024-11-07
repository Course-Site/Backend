import { IUserEntity } from '../interface/user.entity.interface';
import { TUserEntity } from '../type/user.entity.type';

export class UserEntity implements IUserEntity {
  id?: string;
  email: string;
  password: string;
  name: string;
  constructor(data: TUserEntity) {
    this.id = data.id;
    this.email = data.email;
    this.password = data.password;
    this.name = data.name;
  }
}
