import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/presintation/controllers/user.controller';
import { UserService } from 'src/use-cases/user/service/user.service';
import { UserEntity } from '../db/entities/user.entity';
import { UserRepository } from '../db/repositories/user.repository';
import { UserStatisticsModule } from './user_statistics.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UserStatisticsModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'userRepository',
      useClass: UserRepository,
    },
    {
      provide: 'userService',
      useClass: UserService,
    },
  ],
  exports: ['userService'],
})
export class UserModule {}
