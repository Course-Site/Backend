import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionEntity } from './test_question.entity';

@Entity()
export class AnswerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  text: string;

  @Column({ type: 'boolean', default: false })
  isCorrect: boolean;

  @ManyToOne(() => QuestionEntity, (question) => question.answers)
  question: QuestionEntity;
}
