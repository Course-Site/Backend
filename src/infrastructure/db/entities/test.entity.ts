import { IsNotEmpty } from 'class-validator';
import { ScoreMethod } from 'src/entiies/test/test/enums/score_method';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { TestQuestionEntity } from './test_question.entity';
import { TestResultEntity } from './test_result.entity';
import { TopicEntity } from './topic.entity';
import { UserTestStatisticsEntity } from './user_test_statistics.entity';

@Entity()
export class TestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  @IsNotEmpty()
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'float', default: 5 })
  @IsNotEmpty()
  maxScore: number;

  @Column({ type: 'int', default: 1 })
  @IsNotEmpty()
  maxAttempts: number;

  @Column({ type: 'enum', enum: ScoreMethod, default: ScoreMethod.AVERAGE })
  @IsNotEmpty()
  scoreMethod: ScoreMethod;

  @CreateDateColumn()
  addedAt: Date;

  @Column('uuid')
  @IsNotEmpty()
  topicId: string;

  @ManyToOne(() => TopicEntity, (topic) => topic.tests)
  @JoinColumn({ name: 'topicId' })
  topic: TopicEntity;

  @OneToMany(() => TestQuestionEntity, (question) => question.test)
  questions: TestQuestionEntity;

  @OneToMany(() => TestResultEntity, (result) => result.test)
  testResult: TestResultEntity[];

  @OneToMany(() => UserTestStatisticsEntity, (stats) => stats.test)
  testStatistics: UserTestStatisticsEntity[];
}
