import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRole } from 'src/entiies/user/enums/user-role.enum';
import { IUserService } from 'src/use-cases/user/interface/service/user.service.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('userService')
    private readonly userService: IUserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: { id: string; role: UserRole }) {
    const user = await this.userService.findById(payload.id);

    if (!user) {
      throw new UnauthorizedException('У вас нет доступа');
    }

    return {
      id: user.id,
      role: user.role,
    };
  }
}
