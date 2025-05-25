import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { LabResultEntity } from './lab_result.entity';
import { TopicEntity } from './topic.entity';
import { LabReportEntity } from './lab_report.entity';

@Entity()
export class LabEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  title: string;

  @Column({ type: 'float', default: 5 })
  @IsNotEmpty()
  maxScore: number;

  @Column('text', { nullable: true })
  content: string;

  @CreateDateColumn()
  submittedAt: Date;

  @Column('uuid')
  @IsNotEmpty()
  topicId: string;

  @ManyToOne(() => TopicEntity, (topic) => topic.labs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'topicId' })
  topic: TopicEntity;

  @OneToMany(() => LabReportEntity, (labReport) => labReport.labs)
  labReport: LabReportEntity[];

  @OneToMany(() => LabResultEntity, (labResult) => labResult.labs)
  labResult: LabResultEntity[];
}
