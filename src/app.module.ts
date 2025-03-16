import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './infrastructure/modules/user.module';
import { TypeOrmComponent } from './infrastructure/db/conect';
import { AuthModule } from './infrastructure/modules/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmComponent,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
