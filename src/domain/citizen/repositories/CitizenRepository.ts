import { Citizen } from '@/domain/citizen/entities/Citizen';

export interface CitizenRepository {
  getCitizenDetails: (id: string) => Promise<Citizen>;
}
