import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { IAuthService } from 'src/use-cases/auth/interface/service/auth.service.interface';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ICreateUserDto } from 'src/use-cases/user/interface/dto/create.user.dto.interface';
import { LocalAuthGuard } from 'src/infrastructure/JWT/guards/local.guard';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { CreateUserDto } from '../dto/user/create.user.dto';
import { UserRole } from 'src/entiies/user/type/user.entity.type';
import { RolesGuard } from 'src/infrastructure/JWT/guards/roles.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject('authService')
    private readonly authService: IAuthService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @Post('sign-up')
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string', default: 'test@test.com' },
        password: { type: 'string', default: '12345678' },
        name: { type: 'string', default: 'John Doe' },
        role: { type: 'string', default: 'user' },
      },
    },
  })
  async signUp(@Body() data: ICreateUserDto) {
    return this.authService.signUp(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string', default: 'test@test.com' },
        password: { type: 'string', default: '12345678' },
      },
    },
  })
  async login(@Body() data: CreateUserDto) {
    return this.authService.signIn(data);
  }
}
