import { ILabResultEntity } from 'src/entiies/lab/lab_result/interface/lab_result.entity.interface';
import { ICreateLabResultDto } from '../dto/create.lab_result.dto.interface';

export interface ILabResultService {
  createLabResult(data: ICreateLabResultDto): Promise<ILabResultEntity>;
  findAllLabResult(): Promise<ILabResultEntity[]>;
  findByLabAndUser(labId: string, userId: string): Promise<ILabResultEntity[]>;
  findByUserId(userId: string): Promise<ILabResultEntity[]>;
  findById(id: string): Promise<ILabResultEntity>;
  updateLabResult(
    id: string,
    test: Partial<ILabResultEntity>,
  ): Promise<ILabResultEntity>;
  deleteLabResult(id: string): Promise<void>;
}
