import { Citizen } from '@/domain/citizen/entities/Citizen';
import { CitizenRepository } from '@/domain/citizen/repositories/CitizenRepository';

export class GetCitizenUseCase {
  constructor(private readonly repo: CitizenRepository) {}

  async execute(id: string): Promise<Citizen> {
    return this.repo.getCitizenDetails(id);
  }
}
