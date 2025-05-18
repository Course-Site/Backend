import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/presintation/controllers/auth.controller';
import { AuthService } from 'src/use-cases/auth/service/auth.service';
import { UserEntity } from '../db/entities/user.entity';
import { JwtStrategy } from '../JWT/strategies/jwt.strategy';
import { LocalStrategy } from '../JWT/strategies/local.strategy';

import { UserModule } from './user.module';

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
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthModule {}
