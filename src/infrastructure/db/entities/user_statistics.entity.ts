import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
  } from 'typeorm';
  import { UserEntity } from './user.entity';


@Entity()
export class UserStatisticsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { default: 0 })
  totalTestScore: number;

  @Column('int', { default: 0 })
  totalLabScore: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdated: Date;

  @OneToOne(() => UserEntity, user => user.statistics)
  user: UserEntity;
}