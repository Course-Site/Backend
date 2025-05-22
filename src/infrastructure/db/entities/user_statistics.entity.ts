import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class UserStatisticsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float', { default: 0 })
  @IsNotEmpty()
  totalTestScore: number;

  @Column('float', { default: 0 })
  @IsNotEmpty()
  totalLabScore: number;

  @CreateDateColumn()
  lastUpdated: Date;

  @Column('uuid')
  @IsNotEmpty()
  userId: string;

  @OneToOne(() => UserEntity, (user) => user.statistics, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
