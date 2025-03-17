import { Benefit } from '../entities/Benefit';

export interface BenefitsRepository {
  getBenefits: (page: number, size: number) => Promise<{ benefits: Benefit[]; total: number }>;
}
