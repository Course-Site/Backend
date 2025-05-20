import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { TestEntity } from './test.entity';
import { UserEntity } from './user.entity';

@Entity()
export class TestResultEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  @IsNotEmpty()
  score: number;

  @Column('float')
  @IsNotEmpty()
  percentage: number;

  @CreateDateColumn()
  completedAt: Date;

  @Column('uuid')
  @IsNotEmpty()
  userId: string;

  @Column('uuid')
  @IsNotEmpty()
  testId: string;

  @ManyToOne(() => UserEntity, (user) => user.testResult, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => TestEntity, (test) => test.testResult, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'testId' })
  test: TestEntity;
}
