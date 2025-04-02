import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
	JoinTable,
  } from 'typeorm';
import { TopicEntity } from './topic.entity';
import { QuestionEntity } from './test_question.entity'
import { TestResultEntity } from './test_result.entity'
  

@Entity()
export class TestEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column('varchar')
  title: string;
  
  @Column('text', { nullable: true })
  description: string;

  @ManyToOne(() => TopicEntity, topic => topic.tests, { onDelete: 'CASCADE' })
  topic: TopicEntity;
  
  @OneToMany(() => QuestionEntity, question => question.test)
  questions: QuestionEntity[];

  @OneToMany(() => TestResultEntity, result => result.test)
  results: TestResultEntity;
}