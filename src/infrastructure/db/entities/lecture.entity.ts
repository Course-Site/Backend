import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TopicEntity } from './topic.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class LectureEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  @IsNotEmpty()
  title: string;

  @Column('text')
  content: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  addedAt: Date;

  @Column('uuid')
  topicId: string;

  @ManyToOne(() => TopicEntity, (topic) => topic.lectures, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'topicId' })
  topic: TopicEntity;
}
