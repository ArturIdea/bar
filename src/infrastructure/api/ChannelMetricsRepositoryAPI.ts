import { ApiClient } from '@/core/ApiClient';
import { ChannelMetric } from '@/domain/metrics/onboardingChannelsMetrics/entities/ChannelMetric';
import { ChannelMetricsRepository } from '@/domain/metrics/onboardingChannelsMetrics/repositories/ChannelMetricRepository';
import { ChannelMetricsAdapter } from '@/interfaces/ChannelMetricsAdapter';

export class ChannelMetricsRepositoryAPI implements ChannelMetricsRepository {
  private apiClient = ApiClient.shared;
  private apiUrl = '/api/admin/metrics/channels/by-date';

  async getChannelMetrics(
    userId?: string, 
    fromDate?: string, 
    toDate?: string, 
    bankType?: string,
    onboardingChannel?: string
  ): Promise<ChannelMetric> {
    const response = await this.apiClient.get(this.apiUrl, {
      params: {
        fromDate,
        toDate,
        ...(userId && { userId }),
        ...(bankType && { bankType }),
        ...(onboardingChannel && { onboardingChannel })
      },
    });

    if (!response.data || typeof response.data !== 'object' || !('channels' in response.data)) {
      throw new Error('Invalid API response format');
    }

    return ChannelMetricsAdapter.toDomain(response.data);
  }
}
