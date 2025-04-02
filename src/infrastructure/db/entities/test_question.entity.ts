import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { AnswerEntity } from './test_answer.entity'
import { TestEntity } from './test.entity'

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  text: string;

  @Column('varchar')
  imageUrl: string;

  @ManyToOne(() => TestEntity, test => test.questions, { onDelete: 'CASCADE' })
  test: TestEntity;
  
  @OneToMany(() => AnswerEntity, answer => answer.question)
  answers: AnswerEntity[];
}