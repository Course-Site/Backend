import { IApplicationEntity } from '../interface/application.entity.interface';
import { TApplicationEntity } from '../type/application.entity.type';

export class ApplicationEntity implements IApplicationEntity {
  id?: string;
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

  constructor(data: TApplicationEntity) {
    this.id = data.id;
    this.status = data.status;
    this.typeOfLearning = data.typeOfLearning;
    this.fullName = data.fullName;
    this.age = data.age;
    this.city = data.city;
    this.specialty = data.specialty;
    this.parentsName = data.parentsName;
    this.phone = data.phone;
    this.email = data.email;
    this.url = data.url;
  }
}
