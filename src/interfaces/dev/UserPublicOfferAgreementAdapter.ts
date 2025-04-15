import { UserPublicOfferAgreement } from '@/domain/users/dev/entities/UserPublicOfferAgreement';

export const UserPublicOfferAgreementAdapter = {
  toDomain(raw: any): UserPublicOfferAgreement {
    return new UserPublicOfferAgreement(
      raw.s3Refs?.values || {},
      raw.createdAt,
      raw.updatedAt,
      raw.htmlContent?.values || {},
      raw.version,
      raw.active
    );
  },
};
