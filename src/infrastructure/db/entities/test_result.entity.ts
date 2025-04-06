import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { TestEntity } from './test.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class TestResultEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  @IsNotEmpty()
  score: number;

  @Column('float', { nullable: true })
  @IsNotEmpty()
  percentage: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  completedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.testResults)
  user: UserEntity;

  @ManyToOne(() => TestEntity, (test) => test.results)
  test: TestEntity;
}
