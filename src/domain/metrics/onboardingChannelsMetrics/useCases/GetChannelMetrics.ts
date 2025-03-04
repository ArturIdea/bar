import { ChannelMetric } from '../entities/ChannelMetric';
import { ChannelMetricsRepository } from '../repositories/ChannelMetricRepository';

export class GetChannelMetrics {
  constructor(private channelMetricsRepository: ChannelMetricsRepository) {}

  async execute(): Promise<ChannelMetric> {
    return this.channelMetricsRepository.getChannelMetrics();
  }
}
