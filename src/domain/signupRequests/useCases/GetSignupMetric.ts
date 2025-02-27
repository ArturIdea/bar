import { SignupMetric } from '../entities/SignupMetric';
import { SignupMetricsRepository } from '../repositories/SignupMetricsRepository';

export class GetSignupMetrics {
  constructor(private metricsRepository: SignupMetricsRepository) {}

  async execute(from?: string, to?: string): Promise<SignupMetric[]> {
    return this.metricsRepository.getSignupMetrics(from, to);
  }
}
