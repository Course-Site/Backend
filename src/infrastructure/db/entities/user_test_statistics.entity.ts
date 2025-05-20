import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { TestEntity } from './test.entity';
import { UserEntity } from './user.entity';

@Entity()
export class UserTestStatisticsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  calculatedScore: number;

  @CreateDateColumn()
  lastUpdated: Date;

  @Column('uuid')
  @IsNotEmpty()
  userId: string;

  @Column('uuid')
  @IsNotEmpty()
  testId: string;

  @ManyToOne(() => UserEntity, (user) => user.testStatistics, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => TestEntity, (test) => test.testStatistics, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'testId' })
  test: TestEntity;
}
