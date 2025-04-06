import { Entity,	PrimaryGeneratedColumn,	Column, ManyToOne, OneToMany } from 'typeorm';
import { TopicEntity } from './topic.entity';
import { IsNotEmpty } from 'class-validator'
  
  @Entity()
  export class LectureEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;
  
	@Column('varchar')
	@IsNotEmpty()
	title: string;
  
	@Column('text')
	lectureFileUrl: string;
  
	@ManyToOne(() => TopicEntity, topic => topic.lectures, { onDelete: 'CASCADE' })
	topic: TopicEntity;
  }