import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
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

  async validate(payload: { id: string }) {
    const user = await this.userService.findById(payload.id);

    if (!user) {
      throw new UnauthorizedException('У вас нет доступа');
    }

    return {
      id: user.id,
    };
  }
}
