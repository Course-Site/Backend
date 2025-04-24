import { ICreateTestQuestionDto } from 'src/use-cases/test_question/interface/dto/create.test_question.dto.interface';
  
export class CreateTestQuestionDto implements ICreateTestQuestionDto {
	id?: string;
  	text: string;
  	imageUrl: string;
  	number: string;
  	testId: string;
}