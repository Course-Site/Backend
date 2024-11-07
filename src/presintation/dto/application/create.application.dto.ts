import { ICreateApplicationDto } from 'src/use-cases/application/interface/dto/create.application.dto.interface';

export class CreateApplicationDto implements ICreateApplicationDto {
  status?: string;
  typeOfLearning: string;
  fullName: string;
  age: string;
  city: string;
  specialty: string;
  parentsName: string;
  phone: string;
  email: string;
  url: string;
}