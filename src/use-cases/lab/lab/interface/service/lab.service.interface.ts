import { ILabEntity } from 'src/entiies/lab/lab/interface/lab.entity.interface';
import { ICreateLabDto } from '../dto/create.lab.dto.interface';

export interface ILabService {
  createLab(data: ICreateLabDto): Promise<ILabEntity>;
  findAllLabs(): Promise<ILabEntity[]>;
  findById(id: string): Promise<ILabEntity>;
  updateLab(id: string, lab: Partial<ILabEntity>): Promise<ILabEntity>;
  deleteLab(id: string): Promise<void>;
}
