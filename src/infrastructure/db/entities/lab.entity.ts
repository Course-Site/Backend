import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TopicEntity } from './topic.entity';
import { LabResultEntity } from './lab_result.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class LabEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  @IsNotEmpty()
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('varchar')
  guidelineFileUrl: string;

  @ManyToOne(() => TopicEntity, (topic) => topic.labs, { onDelete: 'CASCADE' })
  topic: TopicEntity;

  @OneToMany(() => LabResultEntity, (labResults) => labResults.lab)
  labResults: LabResultEntity[];
}
