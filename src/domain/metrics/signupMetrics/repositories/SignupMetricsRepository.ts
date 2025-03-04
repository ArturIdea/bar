import { SignupMetric } from '../entities/SignupMetric';

export interface SignupMetricsRepository {
  getSignupMetrics: (from?: string, to?: string) => Promise<SignupMetric[]>;
}
