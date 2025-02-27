import { UserMetric } from '../entities/UserMetric';
import { UserMetricsRepository } from '../repositories/UserMetricsRepository';

export class GetUserMetrics {
  constructor(private UserMetricsRepository: UserMetricsRepository) {}

  async execute(from?: string, to?: string): Promise<UserMetric[]> {
    return this.UserMetricsRepository.getUserMetrics(from, to);
  }
}
