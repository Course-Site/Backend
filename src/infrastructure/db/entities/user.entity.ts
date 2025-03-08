import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { UserRole } from 'src/entiies/user/type/user.entity.type';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';


@Entity()
export class UserEntity 
{
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
}
