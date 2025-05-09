import { SignupStageMetric } from '../entities/SignupStageMetric';

export interface SignupStageMetricsRepository {
  getSignupStageMetrics: (fromDate?: string, toDate?: string) => Promise<SignupStageMetric[]>;
}
