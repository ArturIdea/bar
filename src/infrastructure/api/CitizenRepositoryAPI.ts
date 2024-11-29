import { ApiClient } from '@/core/ApiClient';
import { Citizen } from '@/domain/citizen/entities/Citizen';
import { CitizenRepository } from '@/domain/citizen/repositories/CitizenRepository';
import { CitizenAdapter } from '@/interfaces/CitizenAdapter';
import {API_URL} from "@/core/config";

export class CitizenRepositoryAPI implements CitizenRepository {
  async getCitizenDetails(id: string): Promise<Citizen> {
    const res = await ApiClient.shared.get(`/profile/${id}`);
    return CitizenAdapter.toDomain(res.data);
  }
}
