import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmComponent } from './infrastructure/db/conect';
import { AuthModule } from './infrastructure/modules/auth.module';
import { TestEvaluationModule } from './infrastructure/modules/evaluation.module';
import { labModule } from './infrastructure/modules/lab.module';
import { LabResultModule } from './infrastructure/modules/lab_result.module';
import { LectureModule } from './infrastructure/modules/lecture.module';
import { TestModule } from './infrastructure/modules/test.module';
import { TestAnswerModule } from './infrastructure/modules/test_answer.module';
import { TestQuestionModule } from './infrastructure/modules/test_question.module';
import { TestResultModule } from './infrastructure/modules/test_result.module';
import { TopicModule } from './infrastructure/modules/topic.module';
import { UserModule } from './infrastructure/modules/user.module';
import { UserStatisticsModule } from './infrastructure/modules/user_statistics.module';
import { UserTestStatisticsModule } from './infrastructure/modules/user_test_statistics.module';

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
    UserTestStatisticsModule,
    UserStatisticsModule,
    TestEvaluationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
