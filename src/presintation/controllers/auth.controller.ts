import { Body, Controller, Inject, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { IAuthService } from 'src/use-cases/auth/interface/service/auth.service.interface';
import { ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ICreateUserDto } from 'src/use-cases/user/interface/dto/create.user.dto.interface';
import { LocalAuthGuard } from 'src/infrastructure/JWT/guards/local.guard';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/infrastructure/JWT/guards/jwt.guard';
import { UserRole } from 'src/entiies/user/enums/user-role.enum';
import { RolesGuard } from 'src/infrastructure/JWT/guards/roles.guard';
import { UserEntity } from 'src/infrastructure/db/entities/user.entity';
import { User } from 'src/infrastructure/decorators/user.decorator';
import { CurrentUser } from 'src/infrastructure/decorators/current-user.decorator'
import { IJwtUser } from 'src/infrastructure/JWT/strategies/jwt-user.interface'

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
  async login(@User() user: UserEntity) {
    return this.authService.signIn(user);
  }

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
 @Post('verify')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async verifyToken(@CurrentUser() user: IJwtUser) {
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    
    return {
      isValid: true,
      userId: user.id,
      role: user.role
    };
  }
}
