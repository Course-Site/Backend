import { ILabResultEntity } from 'src/entiies/lab_result/interface/lab_result.entity.interface';
import { ICreateLabResultDto } from '../dto/create.lab_result.dto.interface';

export interface ILabResultService {
  createLabResult(data: ICreateLabResultDto): Promise<ILabResultEntity>;
  findAllLabResult(): Promise<ILabResultEntity[]>;
  findById(id: string): Promise<ILabResultEntity>;
  updateLabResult(id: string, labresult: Partial<ILabResultEntity>): Promise<ILabResultEntity>;
  deleteLabResult(id: string): Promise<void>;
}
