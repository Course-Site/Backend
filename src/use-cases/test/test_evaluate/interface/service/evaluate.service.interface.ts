import { IEvaluationDto } from '../dto/evaluation.dto.interface'

export interface ITestEvaluateService {
	evaluateTestSubmission(userId: string, testId: string, answers: IEvaluationDto[])
}
