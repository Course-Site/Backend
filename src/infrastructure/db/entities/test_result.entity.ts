import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  completedAt: Date;

  @Column('uuid')
  @IsNotEmpty()
  userId: string;

  @Column('uuid')
  @IsNotEmpty()
  testId: string;

  @ManyToOne(() => UserEntity, (user) => user.testResult)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => TestEntity, (test) => test.testResult)
  @JoinColumn({ name: 'testId' })
  test: TestEntity;
}
