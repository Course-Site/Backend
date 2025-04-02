import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
  import { UserEntity } from './user.entity';
  import { TestEntity } from './test.entity';
  
  @Entity()
  export class TestResultEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;
  
	@Column('int')
	score: number;

	@Column('float', { nullable: true }) 
	percentage: number;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	completedAt: Date;

	@ManyToOne(() => UserEntity, user => user.testResults)
	user: UserEntity;
  
	@ManyToOne(() => TestEntity, test => test.results)
	test: TestEntity;
  }