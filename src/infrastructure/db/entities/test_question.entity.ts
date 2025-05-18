import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TestEntity } from './test.entity';
import { TestAnswerEntity } from './test_answer.entity';

@Entity()
export class TestQuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  @IsNotEmpty()
  text: string;

  @Column('varchar')
  @IsNotEmpty()
  number: string;

  @Column('uuid')
  @IsNotEmpty()
  testId: string;

  @ManyToOne(() => TestEntity, (test) => test.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'testId' })
  test: TestEntity;

  @OneToMany(() => TestAnswerEntity, (answer) => answer.question)
  answers: TestAnswerEntity[];
}
