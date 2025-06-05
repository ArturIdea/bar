import { ChannelMetric } from '../entities/ChannelMetric';
import { ChannelMetricsRepository } from '../repositories/ChannelMetricRepository';

export class GetChannelMetrics {
  constructor(private channelMetricsRepository: ChannelMetricsRepository) {}

  async execute(userId?: string, fromDate?: string, toDate?: string): Promise<ChannelMetric> {
    return this.channelMetricsRepository.getChannelMetrics(userId, fromDate, toDate);
  }
}
