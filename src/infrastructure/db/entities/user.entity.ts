import { UserRole } from 'src/entiies/user/enums/user-role.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { LabResultEntity } from './lab_result.entity';
import { TestResultEntity } from './test_result.entity';
import { UserStatisticsEntity } from './user_statistics.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column('varchar')
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(256)
  password: string;

  @Column('varchar')
  @IsNotEmpty()
  name: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  @IsNotEmpty()
  role: UserRole;

  @OneToMany(() => TestResultEntity, (testResult) => testResult.user)
  testResults: TestResultEntity[];

  @OneToMany(() => LabResultEntity, (labResult) => labResult.user)
  labResults: LabResultEntity[];

  @OneToOne(() => UserStatisticsEntity, (stats) => stats.user)
  statistics: UserStatisticsEntity[];
}
