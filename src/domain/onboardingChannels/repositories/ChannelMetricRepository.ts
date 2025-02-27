import { ChannelMetric } from '../entities/ChannelMetric';

export interface ChannelMetricsRepository {
  getChannelMetrics: () => Promise<ChannelMetric>;
}
