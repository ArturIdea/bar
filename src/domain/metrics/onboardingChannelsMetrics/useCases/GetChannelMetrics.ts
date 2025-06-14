import { ChannelMetric } from '../entities/ChannelMetric';
import { ChannelMetricsRepository } from '../repositories/ChannelMetricRepository';

export class GetChannelMetrics {
  constructor(private channelMetricsRepository: ChannelMetricsRepository) {}

  async execute(
    userId?: string, 
    fromDate?: string, 
    toDate?: string, 
    bankType?: string,
    onboardingChannel?: string
  ): Promise<ChannelMetric> {
    return this.channelMetricsRepository.getChannelMetrics(
      userId, 
      fromDate, 
      toDate, 
      bankType,
      onboardingChannel
    );
  }
}
