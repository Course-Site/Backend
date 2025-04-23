import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { LabEntity } from './lab.entity';
import { UserStatisticsEntity } from './user_statistics.entity'

@Entity()
export class LabResultEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  submissionFileUrl?: string;

  @Column('int', { nullable: true })
  score: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  submittedAt: Date;

  @Column('uuid')
  userId: string; 

  @Column('uuid')
  labId: string; 

  @Column('uuid')
  userStatisticsId: string; 

  @ManyToOne(() => UserEntity, (user) => user.labResult)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => LabEntity, (lab) => lab.labResult)
  @JoinColumn({ name: 'labId' })
  labs: LabEntity;

  @ManyToOne(() => UserStatisticsEntity, (userStatistics) => userStatistics.labResult)
  @JoinColumn({ name: 'userStatisticsId' })
  statistics: UserStatisticsEntity;
}
