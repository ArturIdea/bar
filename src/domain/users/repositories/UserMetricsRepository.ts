import { UserMetric } from '../entities/UserMetric';

export interface UserMetricsRepository {
  getUserMetrics: (from?: string, to?: string) => Promise<UserMetric[]>;
}
