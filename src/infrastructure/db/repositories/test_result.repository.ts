import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ICreateTestResultDto } from 'src/use-cases/test/test_result/interface/dto/create.test_result.dto.interface';
import { ITestResultRepository } from 'src/use-cases/test/test_result/interface/repository/test_result.repository.interface';
import { TestResultEntity } from '../entities/test_result.entity';
import { Repository } from 'typeorm';
import { ITestResultEntity } from 'src/entiies/test/test_result/interface/test_result.entity.interface';

@Injectable()
export class TestResultRepository implements ITestResultRepository {
  constructor(
    @InjectRepository(TestResultEntity)
    private readonly testresultRepository: Repository<TestResultEntity>,
  ) {}

  async createTestResult(
    data: ICreateTestResultDto,
  ): Promise<ITestResultEntity> {
    try {
      const testresult = this.testresultRepository.create(data);
      return await this.testresultRepository.save(testresult);
    } catch (error) {
      throw error;
    }
  }

  async findAllTestResult(): Promise<ITestResultEntity[]> {
    try {
      return this.testresultRepository.find({});
    } catch (error) {
      throw new Error('TestResults not found');
    }
  }

  async findAllByUserAndTest(userId: string, testId: string) {
    return this.testresultRepository.find({
      where: {
        user: { id: userId },
        test: { id: testId },
      },
      relations: ['user', 'test'],
    });
  }

  async findById(testresultId: string): Promise<ITestResultEntity> {
    try {
      return this.testresultRepository.findOne({
        where: { id: testresultId },
      });
    } catch (error) {
      throw new Error('TestResult not found');
    }
  }

  async findResultsByUserAndTest(
    userId: string,
    testId: string,
  ): Promise<ITestResultEntity[]> {
    return this.testresultRepository.find({
      where: { userId, testId },
      order: { completedAt: 'DESC' },
    });
  }

  async updateTestResult(
    id: string,
    testresult: Partial<ITestResultEntity>,
  ): Promise<ITestResultEntity> {
    try {
      await this.testresultRepository.update(id, testresult);
      return this.testresultRepository.findOne({ where: { id } });
    } catch {
      throw new Error('TestResult not found');
    }
  }

  async deleteTestResult(id: string): Promise<void> {
    try {
      await this.testresultRepository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
