import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { TestEntity } from './test.entity';
import { LabEntity } from './lab.entity';

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

  @ManyToOne(() => UserEntity, (user) => user.labResults)
  user: UserEntity;

  @ManyToOne(() => LabEntity, (lab) => lab.labResults)
  lab: LabEntity;
}
