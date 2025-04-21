import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TestAnswerEntity } from './test_answer.entity';
import { TestEntity } from './test.entity';

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  questionText: string;

  @Column('varchar')
  imageUrl: string;

  @Column('varchar')
  number: string;

  @Column('uuid')
  testId: string; 
  
  @ManyToOne(() => TestEntity, (test) => test.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'testId' })
  test: TestEntity;

  @OneToMany(() => TestAnswerEntity, (answer) => answer.question)
  answers: TestAnswerEntity[];
}
