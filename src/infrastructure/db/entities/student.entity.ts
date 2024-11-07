import { IsEmail, IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity() 
export class StudentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  @IsNotEmpty()
  typeOfLearning: string;

  @Column('varchar')
  @IsNotEmpty()
  fullName: string;

  @Column('varchar')
  @IsNotEmpty()
  age: string;

  @Column('varchar')
  @IsNotEmpty()
  city: string;

  @Column('varchar')
  @IsNotEmpty()
  specialty: string;

  @Column('varchar')
  parentsName: string;

  @Column('varchar')
  @IsNotEmpty()
  phone: string;

  @Column('varchar')
  @IsEmail()
  email: string;

  @Column('varchar')
  url: string;
}