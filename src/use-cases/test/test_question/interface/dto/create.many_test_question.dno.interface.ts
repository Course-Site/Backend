import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateTestQuestionDto } from 'src/presintation/dto/test/create.test_question.dto';

export class CreateManyTestQuestionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTestQuestionDto)
  questions: CreateTestQuestionDto[];
}
