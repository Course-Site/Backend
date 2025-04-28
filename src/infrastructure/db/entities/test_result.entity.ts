import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { TestEntity } from './test.entity';
import { IsNotEmpty } from 'class-validator';
import { UserStatisticsEntity } from './user_statistics.entity'

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
  userId: string; 
  
  @Column('uuid')
  testId: string; 
  
  @ManyToOne(() => UserEntity, (user) => user.testResult)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
  
  @ManyToOne(() => TestEntity, (test) => test.testResult)
  @JoinColumn({ name: 'testId' })
  test: TestEntity;

  @ManyToOne(() => UserStatisticsEntity, (userStatistics) => userStatistics.testResult)
  @JoinColumn({ name: 'userStatisticsId' })
  statistics: UserStatisticsEntity;
}
