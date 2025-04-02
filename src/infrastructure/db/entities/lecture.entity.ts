import { Entity,	PrimaryGeneratedColumn,	Column, ManyToOne, OneToMany } from 'typeorm';
import { TopicEntity } from './topic.entity';
  
  @Entity()
  export class LectureEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;
  
	@Column('varchar')
	title: string;
  
	@Column('text')
	content: string;
  
	@ManyToOne(() => TopicEntity, topic => topic.lectures, { onDelete: 'CASCADE' })
	topic: TopicEntity;
  
	@OneToMany(() => LectureImageEntity, image => image.lecture)
	images: LectureImageEntity[];
  }
  
  @Entity()
  export class LectureImageEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;
  
	@Column('varchar')
	imageUrl: string;
  
	@ManyToOne(() => LectureEntity, lecture => lecture.images, { onDelete: 'CASCADE' })
	lecture: LectureEntity;
}
  