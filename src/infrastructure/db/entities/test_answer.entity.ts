import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TestQuestionEntity } from './test_question.entity';

@Entity()
export class TestAnswerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  text: string;

  @Column({ type: 'boolean', default: false })
  isCorrect: boolean;

  @Column('uuid')
  testQuestionId: string; 

  @ManyToOne(() => TestQuestionEntity, (question) => question.answers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'testQuestionId' })
  question: TestQuestionEntity;
}
