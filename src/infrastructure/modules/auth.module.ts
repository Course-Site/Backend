import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user.module';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/use-cases/auth/service/auth.service';
import { AuthController } from 'src/presintation/controllers/auth.controller';
import { LocalStrategy } from '../JWT/strategies/local.strategy';
import { JwtStrategy } from '../JWT/strategies/jwt.strategy';
import { UserService } from 'src/use-cases/user/service/user.service';
import { UserRepository } from '../db/repositories/user.repository';
import { UserEntity } from '../db/entities/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.getOrThrow('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: configService.getOrThrow('EXPIRES_IN'),
          },
        };
      },
    }),
    UserModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    { provide: 'authService', useClass: AuthService },
    { provide: 'userService', useClass: UserService },
    { provide: 'userRepository', useClass: UserRepository },
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
