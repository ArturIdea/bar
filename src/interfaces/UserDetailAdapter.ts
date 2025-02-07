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
      raw.createdAt,
      raw.authorities ?? [],
      raw.identityProviderData?.personDataLatin?.nationalityName,
      raw.identityProviderData?.personDataLatin?.citizenshipName,
      raw.identityProviderData?.personDataLatin?.birthCountryName,
      raw.identityProviderData?.personDataLatin?.address?.country,
      raw.identityProviderData?.personDataLatin?.address?.region,
      raw.identityProviderData?.personDataLatin?.address?.district,
      raw.identityProviderData?.personDataLatin?.address?.address,
      raw.photoUrl,
      raw.signupRequestId,
      raw.identityProviderData
        ? {
            personDataLatin: {
              socialNumber: raw.identityProviderData.personDataLatin?.socialNumber,
              genderName: raw.identityProviderData.personDataLatin?.genderName,
              nationalityName: raw.identityProviderData.personDataLatin?.nationalityName,
              citizenshipName: raw.identityProviderData.personDataLatin?.citizenshipName,
              birthCountryName: raw.identityProviderData.personDataLatin?.birthCountryName,
              address: {
                country: raw.identityProviderData.personDataLatin?.address?.country,
                region: raw.identityProviderData.personDataLatin?.address?.region,
                district: raw.identityProviderData.personDataLatin?.address?.district,
                address: raw.identityProviderData.personDataLatin?.address?.address,
              },
            },
          }
        : undefined,
      raw.agentData
        ? {
            firstName: raw.agentData.firstName,
            lastName: raw.agentData.lastName,
            jobTitle: raw.agentData.jobTitle,
            dateOfBirth: raw.agentData.dateOfBirth,
            pinfl: raw.agentData.pinfl ? { id: raw.agentData.pinfl.id } : undefined,
            insonCenterDistrict: raw.agentData.insonCenterDistrict,
            insonCenterBranchCode: raw.agentData.insonCenterBranchCode,
            personalPhone: raw.agentData.personalPhone
              ? {
                  phoneCode: raw.agentData.personalPhone.phoneCode,
                  phoneNumber: raw.agentData.personalPhone.phoneNumber,
                }
              : undefined,
            personalEmailAddress: raw.agentData.personalEmailAddress,
            agreementEmailAddress: raw.agentData.agreementEmailAddress,
            address: raw.agentData.address,
            location: raw.agentData.location,
            responsiblePerson: raw.agentData.responsiblePerson,
            mobilePhoneNumbers: raw.agentData.mobilePhoneNumbers
              ? raw.agentData.mobilePhoneNumbers.map(
                  (mobile: { phoneCode: string; phoneNumber: string }) => ({
                    phoneCode: mobile.phoneCode,
                    phoneNumber: mobile.phoneNumber,
                  })
                )
              : undefined,
          }
        : undefined
    );
  },
};
