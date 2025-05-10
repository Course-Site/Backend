import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	JoinColumn,
	OneToMany,
	ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { IsNotEmpty } from 'class-validator';
import { TestResultEntity } from './test_result.entity';
import { TestEntity } from './test.entity'

@Entity()
export class UserTestStatisticsEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'float' })
  calculatedScore: number;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	lastUpdated: Date;

	@Column('uuid')
	@IsNotEmpty()
	userId: string;

	@Column('uuid')
	@IsNotEmpty()
	testId: string;

	@ManyToOne(() => UserEntity, (user) => user.testStatistics)
	@JoinColumn({ name: 'userId' })
	user: UserEntity;

	@ManyToOne(() => TestEntity, (test) => test.testStatistics)
	@JoinColumn({ name: 'testId' })
	test: TestEntity;
}
