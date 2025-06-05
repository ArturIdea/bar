import { ChannelMetric } from '../entities/ChannelMetric';

export interface ChannelMetricsRepository {
  getChannelMetrics: (userId?: string, fromDate?: string, toDate?: string) => Promise<ChannelMetric>;
}
