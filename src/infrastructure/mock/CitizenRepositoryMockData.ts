import { Citizen } from '@/domain/citizen/entities/Citizen';
import { CitizenRepository } from '@/domain/citizen/repositories/CitizenRepository';
import mockData from './citizen_mock_data.json';

export class CitizenRepositoryMockAPI implements CitizenRepository {
  async getCitizenDetails(_: string): Promise<Citizen> {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockData;
  }
}
