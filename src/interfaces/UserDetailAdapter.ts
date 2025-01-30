import { UserDetail } from '@/domain/users/entities/UserDetail';

export const UserDetailAdapter = {
  toDomain(raw: any): UserDetail {
    return new UserDetail(
      raw.username,
      raw.firstName,
      raw.lastName,
      raw.phoneNumber,
      raw.pinfl,
      raw.email,
      raw.documentTypeId,
      raw.documentNumber,
      raw.dateOfBirth,
      raw.socialNumber,
      raw.identityProviderData?.personDataLatin?.nationalityName,
      raw.identityProviderData?.personDataLatin?.citizenshipName,
      raw.identityProviderData?.personDataLatin?.birthCountryName,
      raw.identityProviderData?.personDataLatin?.address?.country,
      raw.identityProviderData?.personDataLatin?.address?.region,
      raw.identityProviderData?.personDataLatin?.address?.district,
      raw.identityProviderData?.personDataLatin?.address?.address,
      raw.authorities,
      raw.createdAt,
      raw.agentData || null,
      raw.photoUrl
    );
  },
};
