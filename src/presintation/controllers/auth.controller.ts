import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { IAuthService } from 'src/use-cases/auth/interface/service/auth.service.interface';
import { ApiBody, ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import { ICreateUserDto } from 'src/use-cases/user/interface/dto/create.user.dto.interface';
import { LocalAuthGuard } from 'src/infrastructure/JWT/guards/local.guard';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { CreateUserDto } from '../dto/user/create.user.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject('authService')
    private readonly authService: IAuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('sign-up')
  @ApiBody({
    schema: {
      properties: {
        email: { type: 'string', default: 'test@test.com' },
        password: { type: 'string', default: '12345678' },
        name: { type: 'string', default: 'John Doe' },
      },
    },
  })
  async signUp(@Body() data: ICreateUserDto) {
    return this.authService.signUp(data);
  }


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
