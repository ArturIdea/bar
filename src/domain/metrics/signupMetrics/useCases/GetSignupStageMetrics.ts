import { SignupStageMetric } from '../entities/SignupStageMetric';
import { SignupStageMetricsRepository } from '../repositories/SignupStageMetricsRepository';

export class GetSignupStageMetrics {
  constructor(private signupStageMetricsRepo: SignupStageMetricsRepository) {}

  async execute(from?: string, to?: string): Promise<SignupStageMetric[]> {
    return this.signupStageMetricsRepo.getSignupStageMetrics(from, to);
  }
}
