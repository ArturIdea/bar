import { SignupStageMetric, SignupStageHighestMetric } from '../entities/SignupStageMetric';

export interface SignupStageMetricsRepository {
  getSignupStageMetrics: (fromDate?: string, toDate?: string) => Promise<SignupStageMetric[]>;
  getSignupStageHighestMetrics: (fromDate?: string, toDate?: string) => Promise<SignupStageHighestMetric[]>;
}
