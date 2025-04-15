import { UserPublicOfferAgreement } from '@/domain/users/dev/entities/UserPublicOfferAgreement';

export interface UserPublicOfferAgreementRepository {
  getUserPublicOfferAgreement: (userId: string) => Promise<UserPublicOfferAgreement>;
}
