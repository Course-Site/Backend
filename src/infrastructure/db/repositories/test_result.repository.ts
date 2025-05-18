import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ITestResultEntity } from 'src/entiies/test/test_result/interface/test_result.entity.interface';
import { ICreateTestResultDto } from 'src/use-cases/test/test_result/interface/dto/create.test_result.dto.interface';
import { ITestResultRepository } from 'src/use-cases/test/test_result/interface/repository/test_result.repository.interface';
import { Repository } from 'typeorm';
import { TestResultEntity } from '../entities/test_result.entity';

@Injectable()
export class TestResultRepository implements ITestResultRepository {
  constructor(
    @InjectRepository(TestResultEntity)
    private readonly testResultRepository: Repository<TestResultEntity>,
  ) {}

  async createTestResult(
    data: ICreateTestResultDto,
  ): Promise<ITestResultEntity> {
    try {
      const testresult = this.testResultRepository.create(data);
      return await this.testResultRepository.save(testresult);
    } catch (error) {
      throw error;
    }
  }

  async findAllTestResult(): Promise<ITestResultEntity[]> {
    try {
      return this.testResultRepository.find({});
    } catch (error) {
      throw new Error('TestResults not found');
    }
  }

  async findAllByUserAndTest(userId: string, testId: string) {
    return this.testResultRepository.find({
      where: {
        user: { id: userId },
        test: { id: testId },
      },
      relations: ['user', 'test'],
    });
  }

  async findById(testResultId: string): Promise<ITestResultEntity> {
    try {
      return this.testResultRepository.findOne({
        where: { id: testResultId },
      });
    } catch (error) {
      throw new Error('TestResult not found');
    }
  }

  async findResultsByUserAndTest(
    userId: string,
    testId: string,
  ): Promise<ITestResultEntity[]> {
    return this.testResultRepository.find({
      where: { userId, testId },
      order: { completedAt: 'DESC' },
    });
  }

  async updateTestResult(
    id: string,
    testResult: Partial<ITestResultEntity>,
  ): Promise<ITestResultEntity> {
    const existing = await this.testResultRepository.findOne({
      where: { id },
      relations: ['test'],
    });

    if (!existing) {
      throw new Error(`TestResult with id ${id} not found`);
    }

    await this.testResultRepository.update(id, testResult);

    const updated = await this.testResultRepository.findOne({
      where: { id },
    });

    if (!updated) {
      throw new Error('Failed to retrieve updated TestResult');
    }

    return updated;
  }

  async deleteTestResult(id: string): Promise<void> {
    try {
      await this.testResultRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
