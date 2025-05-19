import { IsNotEmpty } from 'class-validator';
import { FileType } from 'src/entiies/lab/lab_report/enums/file_type.enum';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

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

  @Column()
  @IsNotEmpty()
  userId: string;

  @Column()
  @IsNotEmpty()
  labId: string;

  @CreateDateColumn()
  uploadedAt: Date;
}
