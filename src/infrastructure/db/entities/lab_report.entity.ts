import { IsNotEmpty } from 'class-validator';
import { FileType } from 'src/entiies/lab/lab_report/enums/file_type.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity'
import { LabEntity } from './lab.entity'

@Entity()
export class LabReportEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  filename: string; // Оригинальное имя файла

  @Column()
  @IsNotEmpty()
  filepath: string; // Путь к файлу на сервере

  @Column({ type: 'enum', enum: FileType, default: FileType.PDF })
  @IsNotEmpty()
  filetype: FileType;

  @Column()
  size: number;

  @CreateDateColumn()
  uploadedAt: Date;

  @Column('uuid')
  @IsNotEmpty()
  userId: string;

  @Column('uuid')
  @IsNotEmpty()
  labId: string;

  @ManyToOne(() => UserEntity, (user) => user.labReport)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
  
  @ManyToOne(() => LabEntity, (lab) => lab.labReport)
  @JoinColumn({ name: 'labId' })
  labs: LabEntity;
}
