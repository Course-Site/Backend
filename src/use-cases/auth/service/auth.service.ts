import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/entiies/user/enums/user-role.enum';
import { CreateUserDto } from 'src/presintation/dto/user/create.user.dto';
import { IUserService } from '../../user/interface/service/user.service.interface';
import { IAuthService } from '../interface/service/auth.service.interface';

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  async signUp(data: CreateUserDto): Promise<{ token: string }> {
    try {
      const candidate = await this.userService.findByEmail(data.email);
      if (candidate) {
        throw new ForbiddenException(
          'Пользователь с таким email уже существует',
        );
      }

      const userData = await this.userService.createUser(data);
      return {
        token: this.jwtService.sign({
          id: userData.id,
          role: userData.role,
        }),
      };
    } catch (err) {
      throw new ForbiddenException('Ошибка при регистрации');
    }
  }

  async signIn(user: { id: string; role: string }) {
    if (!user.role) user.role = UserRole.USER; // Защита от undefined
    return {
      token: this.jwtService.sign({ id: user.id, role: user.role }),
    };
  }
}
