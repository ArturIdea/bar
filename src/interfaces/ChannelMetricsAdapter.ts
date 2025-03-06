import { ChannelMetric } from '@/domain/metrics/onboardingChannelsMetrics/entities/ChannelMetric';

export const ChannelMetricsAdapter = {
  toDomain(raw: any): ChannelMetric {
    if (!raw || typeof raw !== 'object') {
      throw new Error('Invalid API response format');
    }
    return new ChannelMetric(raw.channels);
  },
};
