import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { LabEntity } from './lab.entity';
import { UserStatisticsEntity } from './user_statistics.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class LabResultEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  submissionFileUrl?: string;

  @Column('int', { nullable: true })
  @IsNotEmpty()
  score: number;

  @Column('float')
  @IsNotEmpty()
  percentage: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  submittedAt: Date;

  @Column('uuid')
  @IsNotEmpty()
  userId: string;

  @Column('uuid')
  @IsNotEmpty()
  labId: string;

  @ManyToOne(() => UserEntity, (user) => user.labResult)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => LabEntity, (lab) => lab.labResult)
  @JoinColumn({ name: 'labId' })
  labs: LabEntity;

  @ManyToOne(
    () => UserStatisticsEntity,
    (userStatistics) => userStatistics.labResult,
  )
  @JoinColumn({ name: 'userStatisticsId' })
  statistics: UserStatisticsEntity;
}
