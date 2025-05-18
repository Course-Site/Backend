import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { TestEntity } from './test.entity';
import { UserEntity } from './user.entity';

@Entity()
export class UserTestStatisticsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  calculatedScore: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdated: Date;

  @Column('uuid')
  @IsNotEmpty()
  userId: string;

  @Column('uuid')
  @IsNotEmpty()
  testId: string;

  @ManyToOne(() => UserEntity, (user) => user.testStatistics)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => TestEntity, (test) => test.testStatistics)
  @JoinColumn({ name: 'testId' })
  test: TestEntity;
}
