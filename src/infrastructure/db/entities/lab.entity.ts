import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { LabResultEntity } from './lab_result.entity';
import { TopicEntity } from './topic.entity'

@Entity()
export class LabEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  title: string;

  @Column('varchar', { nullable: true })
  description: string;

  @Column('varchar', { nullable: true })
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  submittedAt: Date;

  @Column('uuid')
  topicId: string; 

  @ManyToOne(() => TopicEntity, (topic) => topic.labs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'topicId' })
  topic: TopicEntity;

  @OneToMany(() => LabResultEntity, (labResult) => labResult.labs)
  labResult: LabResultEntity[];
}