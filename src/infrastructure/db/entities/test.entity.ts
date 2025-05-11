import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { TopicEntity } from './topic.entity';
import { TestQuestionEntity } from './test_question.entity';
import { TestResultEntity } from './test_result.entity';
import { IsNotEmpty } from 'class-validator';
import { ScoreMethod } from 'src/entiies/test/test/enums/score_method';
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

  @Column({ type: 'int', default: 5 })
  @IsNotEmpty()
  maxScore: number;

  @Column({ type: 'int', default: 1 })
  @IsNotEmpty()
  maxAttempts: number;

  @Column({ type: 'enum', enum: ScoreMethod, default: ScoreMethod.AVERAGE })
  @IsNotEmpty()
  scoreMethod: ScoreMethod;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  addedAt: Date;

  @Column('uuid')
  @IsNotEmpty()
  topicId: string;

  @ManyToOne(() => TopicEntity, (topic) => topic.tests, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'topicId' })
  topic: TopicEntity;

  @OneToMany(() => TestQuestionEntity, (question) => question.test)
  questions: TestQuestionEntity;

  @OneToMany(() => TestResultEntity, (result) => result.test)
  testResult: TestResultEntity[];

  @ManyToOne(() => UserTestStatisticsEntity, (stats) => stats.test)
  testStatistics: UserTestStatisticsEntity[];
}
