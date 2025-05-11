import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TestQuestionEntity } from './test_question.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class TestAnswerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  @IsNotEmpty()
  text: string;

  @Column({ type: 'boolean', default: false })
  @IsNotEmpty()
  isCorrect: boolean;

  @Column({ type: 'int', default: 1 })
  @IsNotEmpty()
  score: number;

  @Column('uuid')
  @IsNotEmpty()
  questionId: string;

  @ManyToOne(() => TestQuestionEntity, (question) => question.answers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'questionId' })
  question: TestQuestionEntity;
}
