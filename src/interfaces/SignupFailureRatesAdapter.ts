import { SignupFailureRate } from '@/domain/metrics/signupMetrics/entities/SignupFailureRate';

export const SignupFailureRatesAdapter = {
  toDomain(raw: any): SignupFailureRate {
    return new SignupFailureRate(raw.date, raw.totalDropOffs, raw.totalDropOffRate);
  },

  toDomainList(rawList: any[]): SignupFailureRate[] {
    return rawList.map((raw) => SignupFailureRatesAdapter.toDomain(raw));
  },
};
