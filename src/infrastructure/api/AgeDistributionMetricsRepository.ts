import { ApiClient } from '@/core/ApiClient';
import { AgeDistributionMetric } from '@/domain/metrics/ageDistributionMetrics/entities/AgeDistributionMetric';
import { AgeDistributionMetricRepository } from '@/domain/metrics/ageDistributionMetrics/repositories/AgeDistributionRepository';
import { AgeDistributionAdapter } from '@/interfaces/AgeDistributionMetricsAdapter';

export class AgeDistributionMetricsRepositoryAPI implements AgeDistributionMetricRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/admin/metrics/age-distribution';

  async getAgeDistribution(): Promise<AgeDistributionMetric> {
    const response = await this.apiClient.get(this.apiUrl);
    return AgeDistributionAdapter.toDomain(response.data);
  }
}
