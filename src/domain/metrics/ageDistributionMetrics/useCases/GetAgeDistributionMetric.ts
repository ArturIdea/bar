import { AgeDistributionMetric } from '../entities/AgeDistributionMetric';
import { AgeDistributionMetricRepository } from '../repositories/AgeDistributionRepository';

export class GetAgeDistribution {
  constructor(private repository: AgeDistributionMetricRepository) {}

  async execute(): Promise<AgeDistributionMetric> {
    return this.repository.getAgeDistribution();
  }
}
