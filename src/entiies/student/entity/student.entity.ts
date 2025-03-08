import { IStudentEntity } from '../interface/student.entity.interface';
import { TStudentEntity } from '../type/student.entity.type';

export class StudentEntity implements IStudentEntity {
  id?: string;
  typeOfLearning: string;
  fullName: string;
  age: string;
  city: string;
  specialty: string;
  parentsName: string;
  phone: string;
  email: string;
  url: string;

  constructor(data: TStudentEntity) {
    this.id = data.id;
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
