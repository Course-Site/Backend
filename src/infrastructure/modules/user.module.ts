import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/presintation/controllers/user.controller';
import { UserService } from 'src/use-cases/user/service/user.service';
import { UserRepository } from '../db/repositories/user.repository';
import { UserEntity } from '../db/entities/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: 'userRepository',
      useClass: UserRepository,
    },
    {
      provide: 'userService',
      useClass: UserService,
    }
  ],
})
export class UserModule {}
