import { SignupFailureRate } from '../entities/SignupFailureRate';

export interface SignupFailureRatesRepository {
  getSignupFailureRates: (fromDate?: string, toDate?: string) => Promise<SignupFailureRate[]>;
}
