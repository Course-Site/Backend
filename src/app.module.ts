import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './infrastructure/modules/user.module';
import { TypeOrmComponent } from './infrastructure/db/conect';
import { AuthModule } from './infrastructure/modules/auth.module';
import { ApplicationModule } from './infrastructure/modules/application.module';
import { StudentModule } from './infrastructure/modules/student.module';
//import { RolesGuard } from 'src/infrastructure/JWT/guards/roles.guard'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmComponent,
    UserModule,
    AuthModule,
    ApplicationModule,
    StudentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
