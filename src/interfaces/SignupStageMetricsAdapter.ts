import {
  SignupStage,
  SignupStageMetric,
} from '@/domain/metrics/signupMetrics/entities/SignupStageMetric';

export const SignupStageMetricsAdapter = {
  toDomain: (key: string, raw: any): SignupStageMetric => {
    return new SignupStageMetric(
      key as SignupStage,
      raw.signupRequestsNumber,
      raw.dropOffPercentage
    );
  },

  toDomainList: (rawObj: Record<string, any>): SignupStageMetric[] => {
    return Object.entries(rawObj).map(([key, value]) =>
      SignupStageMetricsAdapter.toDomain(key, value)
    );
  },
};
