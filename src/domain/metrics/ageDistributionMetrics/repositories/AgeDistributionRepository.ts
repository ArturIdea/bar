import { AgeDistributionMetric } from '../entities/AgeDistributionMetric';

export interface AgeDistributionMetricRepository {
  getAgeDistribution: () => Promise<AgeDistributionMetric>;
}
