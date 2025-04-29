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

@Entity()
export class TestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  @IsNotEmpty()
  title: string;

  @Column('text')
  description: string;

  @Column({type: 'int', default: 5})
  @IsNotEmpty()
  maxScore: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  addedAt: Date;

  @Column('uuid')
  @IsNotEmpty()
  topicId: string; 

  @ManyToOne(() => TopicEntity, (topic) => topic.tests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'topicId' })
  topic: TopicEntity;

  @OneToMany(() => TestQuestionEntity, (question) => question.test)
  questions: TestQuestionEntity;

  @OneToMany(() => TestResultEntity, (result) => result.test)
  testResult: TestResultEntity[];
}
