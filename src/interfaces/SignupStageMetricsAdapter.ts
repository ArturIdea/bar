import {
  SignupStage,
  SignupStageMetric,
  SignupStageHighestMetric,
} from '@/domain/metrics/signupMetrics/entities/SignupStageMetric';

const ORDERED_STAGES: SignupStage[] = [
  SignupStage.CREATED,
  SignupStage.NASP_FAILED,
  SignupStage.NOT_ELIGIBLE,
  SignupStage.VERIFICATION_FAILED,
  SignupStage.FAILED_FINALIZATION,

  SignupStage.OTP_SENT,
  SignupStage.MOBILE_VERIFIED,
  SignupStage.PERSONAL_INFO_VERIFIED,
  SignupStage.AGREEMENTS_ACCEPTED,
  SignupStage.FACE_VERIFICATION_IN_PROGRESS,
  SignupStage.VERIFICATION_COMPLETED,
  SignupStage.COMPLETED,
];

export const SignupStageMetricsAdapter = {
  toDomain: (key: string, raw: any): SignupStageMetric => {
    return new SignupStageMetric(key as SignupStage, raw.signupRequestsNumber);
  },

  toDomainList: (rawObj: Record<string, any>): SignupStageMetric[] => {
    return ORDERED_STAGES.map((stage) => {
      const n = rawObj[stage]?.signupRequestsNumber ?? 0;
      return new SignupStageMetric(stage, n);
    });
  },

  toHighestDomainList: (rawObj: Record<string, any>): SignupStageHighestMetric[] => {
    return Object.entries(rawObj).map(([stage, data]: [string, any]) => {
      return new SignupStageHighestMetric(
        stage as SignupStage,
        data.signupRequestsNumber,
        data.dropPercentage
      );
    });
  },
};
