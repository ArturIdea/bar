import { SignupMetric } from '@/domain/metrics/signupMetrics/entities/SignupMetric';

export const SignupMetricsAdapter = {
  toDomain(raw: any): SignupMetric {
    return new SignupMetric(
      raw.id,
      raw.date,
      raw.totalSignupRequests,
      raw.failedSignupRequests,
      raw.successfulSignupRequests
    );
  },

  toDomainList(rawList: any[]): SignupMetric[] {
    return rawList.map((raw) => SignupMetricsAdapter.toDomain(raw));
  },
};
