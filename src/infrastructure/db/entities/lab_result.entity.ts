import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { LabEntity } from './lab.entity';
import { UserEntity } from './user.entity';

@Entity()
export class LabResultEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  submissionFileUrl?: string;

  @Column('float', { nullable: true })
  @IsNotEmpty()
  score: number;

  @Column('float')
  @IsNotEmpty()
  percentage: number;

  @CreateDateColumn()
  submittedAt: Date;

  @Column('uuid')
  @IsNotEmpty()
  userId: string;

  @Column('uuid')
  @IsNotEmpty()
  labId: string;

  @ManyToOne(() => UserEntity, (user) => user.labResult, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => LabEntity, (lab) => lab.labResult, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'labId' })
  labs: LabEntity;
}
