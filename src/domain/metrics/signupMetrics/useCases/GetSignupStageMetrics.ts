import { SignupStageMetric } from '../entities/SignupStageMetric';
import { SignupStageMetricsRepository } from '../repositories/SignupStageMetricsRepository';

export class GetSignupStageMetrics {
  constructor(private signupStageMetricsRepo: SignupStageMetricsRepository) {}

  async execute(fromDate?: string, toDate?: string): Promise<SignupStageMetric[]> {
    return this.signupStageMetricsRepo.getSignupStageMetrics(fromDate, toDate);
  }
}

export class GetSignupStageHighestMetrics {
  constructor(private signupStageMetricsRepo: SignupStageMetricsRepository) {}

  async execute(fromDate?: string, toDate?: string) {
    return this.signupStageMetricsRepo.getSignupStageHighestMetrics(fromDate, toDate);
  }
}
