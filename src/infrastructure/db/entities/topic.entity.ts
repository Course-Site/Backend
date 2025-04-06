import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { LectureEntity } from './lecture.entity';
import { TestEntity } from './test.entity';
import { LabEntity } from './lab.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class TopicEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  @IsNotEmpty()
  title: string;

  @OneToMany(() => LectureEntity, (lecture) => lecture.topic, {
    nullable: true,
  })
  lectures: LectureEntity[];

  @OneToMany(() => TestEntity, (test) => test.topic, { nullable: true })
  tests: TestEntity[];

  @OneToMany(() => LabEntity, (lab) => lab.topic, { nullable: true })
  labs: LabEntity[];
}
