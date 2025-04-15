import { UserPublicOfferAgreement } from '../entities/UserPublicOfferAgreement';
import { UserPublicOfferAgreementRepository } from '../repositories/UserPublicOfferAgreementRepository';

export class GetUserPublicOfferAgreement {
  constructor(private repository: UserPublicOfferAgreementRepository) {}

  async execute(userId: string): Promise<UserPublicOfferAgreement> {
    return this.repository.getUserPublicOfferAgreement(userId);
  }
}
