import { Benefit } from '../entities/Benefit';
import { BenefitsRepository } from '../repositories/BenefitsRepository';

export class GetBenefits {
  constructor(private benefitsRepository: BenefitsRepository) {}

  async execute(page?: number, size?: number): Promise<{ benefits: Benefit[]; total: number }> {
    return this.benefitsRepository.getBenefits(page, size);
  }
}
