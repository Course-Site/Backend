import { LabEntity } from '../entity/lab.entity';

export interface ILabEntity {
  id?: string;
  title: string;
  description?: string;
  guidelineFileUrl: string;
}
