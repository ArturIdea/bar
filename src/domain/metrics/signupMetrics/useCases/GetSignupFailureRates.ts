import { SignupFailureRatesRepository } from '../repositories/SignupFailureRatesRepository';

export class GetSignupFailureRates {
  constructor(private signupFailureRatesRepository: SignupFailureRatesRepository) {}

  async execute(fromDate?: string, toDate?: string): Promise<any[]> {
    return this.signupFailureRatesRepository.getSignupFailureRates(fromDate, toDate);
  }
}
