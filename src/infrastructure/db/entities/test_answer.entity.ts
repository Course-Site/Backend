import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TestQuestionEntity } from './test_question.entity';
import { IsNotEmpty } from 'class-validator'

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

  @Column('uuid')
  @IsNotEmpty()
  testQuestionId: string; 

  @ManyToOne(() => TestQuestionEntity, (question) => question.answers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'testQuestionId' })
  question: TestQuestionEntity;
}
