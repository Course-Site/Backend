import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateTestDto } from 'src/use-cases/test/test/interface/dto/create.test.dto.interface';
import { ITestRepository } from 'src/use-cases/test/test/interface/repository/test.repository.interface';
import { TestEntity } from '../entities/test.entity';
import { Repository } from 'typeorm';
import { ITestEntity } from 'src/entiies/test/test/interface/test.entity.interface';
import { ITestWithQuestionsEntity } from 'src/entiies/test/test/interface/test_with_questions.entity.interface';

@Injectable()
export class TestRepository implements ITestRepository {
  constructor(
    @InjectRepository(TestEntity)
    private readonly testRepository: Repository<TestEntity>,
  ) {}

  async createTest(data: ICreateTestDto): Promise<ITestEntity> {
    try {
      const test = this.testRepository.create(data);
      return await this.testRepository.save(test);
    } catch (error) {
      throw error;
    }
  }

  async findAllTests(): Promise<ITestEntity[]> {
    try {
      return this.testRepository.find({});
    } catch (error) {
      throw new Error('Tests not found');
    }
  }

  async findById(testId: string): Promise<ITestEntity> {
    try {
      return this.testRepository.findOne({ where: { id: testId } });
    } catch (error) {
      throw new Error('Test not found');
    }
  }

  async updateTest(
    id: string,
    test: Partial<ITestEntity>,
  ): Promise<ITestEntity> {
    try {
      await this.testRepository.update(id, test);
      return this.testRepository.findOne({ where: { id } });
    } catch {
      throw new Error('Test not found');
    }
  }

  async deleteTest(id: string): Promise<void> {
    try {
      await this.testRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findWithQuestions(testId: string): Promise<ITestWithQuestionsEntity> {
    return this.testRepository.findOne({
      where: { id: testId },
      relations: ['questions', 'questions.answers'],
    }) as unknown as ITestWithQuestionsEntity;
  }
}
