import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class UserStatisticsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int', { default: 0 })
  @IsNotEmpty()
  totalTestScore: number;

  @Column('int', { default: 0 })
  @IsNotEmpty()
  totalLabScore: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdated: Date;

  @OneToOne(() => UserEntity, (user) => user.statistics)
  user: UserEntity;
}
