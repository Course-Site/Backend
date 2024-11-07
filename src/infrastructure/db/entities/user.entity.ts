import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';


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
  password: string;

  @Column('varchar')
  @IsNotEmpty()
  name: string;
}
