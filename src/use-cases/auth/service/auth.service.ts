import { CreateUserDto } from 'src/presintation/dto/user/create.user.dto';
import { IAuthService } from '../interface/service/auth.service.interface';
import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { IUserService } from '../../user/interface/service/user.service.interface';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/infrastructure/db/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/entiies/user/type/user.entity.type';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('userService')
    private readonly userService: IUserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<{
    id?: string;
    email: string;
    name: string;
    role?: UserRole;
  }> {
    const user = await this.userService.findByEmail(email);

    const pass = bcrypt.compareSync(password, user.password);

    if (user && pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async signUp(data: CreateUserDto): Promise<{ token: string }> {
    try {
      const candidate = await this.userService.findByEmail(data.email);
      if (candidate) {
        throw new ForbiddenException(
          'Пользователь с таким email уже существует',
        );
      }

      if (
        data.role !== UserRole.ADMIN &&
        data.role !== UserRole.USER &&
        data.role !== undefined
      ) {
        throw new ForbiddenException(
          'Пользователь с такой ролью не может существовать',
        );
      }

      const userData = await this.userService.createUser(data);

      return {
        token: this.jwtService.sign({ id: userData.id }),
      };
    } catch (err) {
      throw new ForbiddenException('Ошибка при регистрации');
    }
  }

  async signIn(user: UserEntity) {
    return {
      token: this.jwtService.sign({ id: user.id }),
    };
  }
}
