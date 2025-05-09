import { Container } from 'inversify';
import { SignupFailureRatesRepository } from '@/domain/metrics/signupMetrics/repositories/SignupFailureRatesRepository';
import { GetSignupFailureRates } from '@/domain/metrics/signupMetrics/useCases/GetSignupFailureRates';
import { SignupFailureRateRepositoryAPI } from '@/infrastructure/api/SignupFailureRatesRepositoryAPI';

export const loadSignupFailureRatesRepositories = (container: Container) => {
  container
    .bind('SignupFailureRatesRepository')
    .to(SignupFailureRateRepositoryAPI)
    .inSingletonScope();
};

export const loadSignupFailureRatesUseCases = (container: Container) => {
  container
    .bind('GetSignupFailureRates')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<SignupFailureRatesRepository>(
        'SignupFailureRatesRepository'
      );
      return new GetSignupFailureRates(publicRepo);
    })
    .inSingletonScope();
};
