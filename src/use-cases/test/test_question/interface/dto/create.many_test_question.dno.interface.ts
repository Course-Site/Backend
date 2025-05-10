// src/questions/dto/create-many-questions.dto.ts
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTestQuestionDto } from 'src/presintation/dto/test/create.test_question.dto';

export class CreateManyTestQuestionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTestQuestionDto)
  questions: CreateTestQuestionDto[];
}
