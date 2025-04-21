import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { IsNotEmpty } from 'class-validator';
import { LabResultEntity } from './lab_result.entity'
import { TestResultEntity } from './test_result.entity'

@Entity()
export class UserStatisticsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { default: 0 })
  @IsNotEmpty()
  totalTestScore: number;

  @Column('int', { default: 0 })
  @IsNotEmpty()
  totalLabScore: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdated: Date;

  @Column('uuid')
  userId: string; 

  @Column('uuid')
  labResultId: string; 

  @Column('uuid')
  testResultId: string; 

  @OneToOne(() => UserEntity, (user) => user.statistics)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @OneToMany(() => LabResultEntity, (labResult) => labResult.statistics)
  @JoinColumn({ name: 'labResultId' })
  labResult: LabResultEntity;
  
  @OneToMany(() => TestResultEntity, (testResult) => testResult.statistics)
  @JoinColumn({ name: 'testResultId' })
  testResult: TestResultEntity;
}
