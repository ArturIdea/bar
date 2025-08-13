import { ApiClient } from '@/core/ApiClient';
import { Citizen } from '@/domain/citizen/entities/Citizen';
import { CitizenRepository } from '@/domain/citizen/repositories/CitizenRepository';
import { CitizenAdapter } from '@/interfaces/CitizenAdapter';

export class CitizenRepositoryAPI implements CitizenRepository {
  async getCitizenDetails(id: string): Promise<Citizen> {
    const res = await ApiClient.shared.get(`/api-public/user/profile`, {
      params: { id },
      headers: { 'Channel-Type': 'HTTP_CLIENT' },
    });
    return CitizenAdapter.toDomain(res.data);
  }
}
