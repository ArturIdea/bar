import { Container } from 'inversify';
import { UserPublicOfferAgreementRepository } from '@/domain/users/dev/repositories/UserPublicOfferAgreementRepository';
import { GetUserPublicOfferAgreement } from '@/domain/users/dev/useCases/GetUserPublicOfferAgreement';
import { UserPublicOfferAgreementRepositoryAPI } from '@/infrastructure/api/dev/UserPublicOfferAgreementRepositoryAPI';

export const loadDevUserPublicOfferAgreementRepositories = (container: Container) => {
  container
    .bind('DevUserPublicOfferAgreementRepository')
    .to(UserPublicOfferAgreementRepositoryAPI)
    .inSingletonScope();
};

export const loadDevUserPublicOfferAgreementUseCases = (container: Container) => {
  container
    .bind('GetDevUserPublicOfferAgreements')
    .toDynamicValue((context) => {
      const publicRepo = context.container.get<UserPublicOfferAgreementRepository>(
        'DevUserPublicOfferAgreementRepository'
      );
      return new GetUserPublicOfferAgreement(publicRepo);
    })
    .inSingletonScope();
};
