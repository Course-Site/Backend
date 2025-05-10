import { Inject, Injectable } from '@nestjs/common';
import { ITestService } from '../interface/service/test.service.interface';
import { ITestRepository } from '../interface/repository/test.repository.interface';
import { ITestEntity } from 'src/entiies/test/test/interface/test.entity.interface';
import { ICreateTestDto } from '../interface/dto/create.test.dto.interface';

@Injectable()
export class TestService implements ITestService {
  constructor(
    @Inject('testRepository')
    private readonly testRepository: ITestRepository,
  ) {}

  async createTest(data: ICreateTestDto): Promise<ITestEntity> {
    return this.testRepository.createTest({
      title: data.title,
      description: data.description,
      maxScore: data.maxScore,
      topicId: data.topicId,
      maxAttempts: data.maxAttempts,
      scoreMethod: data.scoreMethod,
    });
  }

  async findAllTests(): Promise<ITestEntity[]> {
    return await this.testRepository.findAllTests();
  }

  async findById(id: string): Promise<ITestEntity> {
    return this.testRepository.findById(id);
  }

  async updateTest(
    id: string,
    test: Partial<ITestEntity>,
  ): Promise<ITestEntity> {
    return await this.testRepository.updateTest(id, test);
  }

  async deleteTest(id: string): Promise<void> {
    try {
      return await this.testRepository.deleteTest(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
