import { ChannelMetric } from '@/domain/onboardingChannels/entities/ChannelMetric';

export const ChannelMetricsAdapter = {
  toDomain(raw: any): ChannelMetric {
    return new ChannelMetric(raw.channels);
  },
};
