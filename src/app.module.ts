import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './infrastructure/modules/user.module';
import { TypeOrmComponent } from './infrastructure/db/conect';
import { AuthModule } from './infrastructure/modules/auth.module';
import { UserStatisticsModule } from './infrastructure/modules/user_statistics.module';
import { labModule } from './infrastructure/modules/lab.module';
import { TestModule } from './infrastructure/modules/test.module';
import { LectureModule } from './infrastructure/modules/lecture.module';
import { TestResultModule } from './infrastructure/modules/test_result.module';
import { LabResultModule } from './infrastructure/modules/lab_result.module';
import { TestAnswerModule } from './infrastructure/modules/test_answer.module';
import { TestQuestionModule } from './infrastructure/modules/test_question.module';
import { TopicModule } from './infrastructure/modules/topic.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmComponent,
    AuthModule,
    UserModule, 
    TopicModule,
    labModule,
    LabResultModule,
    TestModule,
    TestAnswerModule,
    TestQuestionModule,
    TestResultModule,
    LectureModule,
    UserStatisticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
