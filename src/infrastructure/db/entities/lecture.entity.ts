import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { TopicEntity } from './topic.entity';

@Entity()
export class LectureEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  @IsNotEmpty()
  title: string;

  @Column('text')
  content: string;

  @CreateDateColumn()
  addedAt: Date;

  @Column('uuid')
  topicId: string;

  @ManyToOne(() => TopicEntity, (topic) => topic.lectures, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'topicId' })
  topic: TopicEntity;
}
