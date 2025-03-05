import { UserDetail } from '@/domain/users/entities/UserDetail';

export const UserDetailAdapter = {
  toDomain(raw: any): UserDetail {
    return new UserDetail(
      raw.username || 'N/A',
      raw.firstName || 'N/A',
      raw.lastName || 'N/A',
      raw.phoneNumber || 'N/A',
      raw.pinfl,
      raw.email || 'N/A',
      raw.documentTypeId || 'N/A',
      raw.documentNumber || 'N/A',
      raw.dateOfBirth || 'N/A',
      raw.socialNumber || 'N/A',
      raw.createdAt || 'N/A',
      raw.authorities ?? [],
      raw.identityProviderData?.personDataLatin?.nationalityName || 'N/A',
      raw.identityProviderData?.personDataLatin?.citizenshipName || 'N/A',
      raw.identityProviderData?.personDataLatin?.birthCountryName || 'N/A',
      raw.identityProviderData?.personDataLatin?.address?.country || 'N/A',
      raw.identityProviderData?.personDataLatin?.address?.region || 'N/A',
      raw.identityProviderData?.personDataLatin?.address?.district || 'N/A',
      raw.identityProviderData?.personDataLatin?.address?.address || 'N/A',
      raw.photoUrl,
      raw.signupRequestId,
      raw.identityProviderData
        ? {
            personDataLatin: {
              socialNumber: raw.identityProviderData.personDataLatin?.socialNumber || 'N/A',
              genderName: raw.identityProviderData.personDataLatin?.genderName || 'N/A',
              nationalityName: raw.identityProviderData.personDataLatin?.nationalityName || 'N/A',
              citizenshipName: raw.identityProviderData.personDataLatin?.citizenshipName || 'N/A',
              birthCountryName: raw.identityProviderData.personDataLatin?.birthCountryName || 'N/A',
              address: {
                country: raw.identityProviderData.personDataLatin?.address?.country || 'N/A',
                region: raw.identityProviderData.personDataLatin?.address?.region || 'N/A',
                district: raw.identityProviderData.personDataLatin?.address?.district || 'N/A',
                address: raw.identityProviderData.personDataLatin?.address?.address || 'N/A',
              },
            },
          }
        : undefined,
      raw.agentData
        ? {
            firstName: raw.agentData.firstName || 'N/A',
            lastName: raw.agentData.lastName || 'N/A',
            jobTitle: raw.agentData.jobTitle || 'N/A',
            dateOfBirth: raw.agentData.dateOfBirth,
            pinfl: raw.agentData.pinfl ? { id: raw.agentData.pinfl.id } : undefined,
            insonCenterDistrict: raw.agentData.insonCenterDistrict || 'N/A',
            insonCenterBranchCode: raw.agentData.insonCenterBranchCode || 'N/A',
            personalPhone: raw.agentData.personalPhone
              ? {
                  phoneCode: raw.agentData.personalPhone.phoneCode || 'N/A',
                  phoneNumber: raw.agentData.personalPhone.phoneNumber || 'N/A',
                }
              : undefined,
            personalEmailAddress: raw.agentData.personalEmailAddress || 'N/A',
            agreementEmailAddress: raw.agentData.agreementEmailAddress || 'N/A',
            address: raw.agentData.address || 'N/A',
            location: raw.agentData.location || 'N/A',
            responsiblePerson: raw.agentData.responsiblePerson || 'N/A',
            mobilePhoneNumbers: raw.agentData.mobilePhoneNumbers
              ? raw.agentData.mobilePhoneNumbers.map(
                  (mobile: { phoneCode: string; phoneNumber: string }) => ({
                    phoneCode: mobile.phoneCode || 'N/A',
                    phoneNumber: mobile.phoneNumber || 'N/A',
                  })
                )
              : undefined,
          }
        : undefined,
      raw.createdBy
        ? {
            userId: raw.createdBy.userId || 'N/A',
            firstName: raw.createdBy.firstName || 'N/A',
            lastName: raw.createdBy.lastName || 'N/A',
            photoUrl: raw.createdBy.photoUrl,
          }
        : undefined,
      raw.benefits
        ? raw.benefits.map((benefit: any) => ({
            status: benefit.status || 'N/A',
            benefitType: benefit.benefitType
              ? {
                  id: benefit.benefitType.id,
                  name: {
                    qr: benefit.benefitType.name?.qr || 'N/A',
                    ru: benefit.benefitType.name?.ru || 'N/A',
                    uzCyrl: benefit.benefitType.name?.uzCyrl || 'N/A',
                    uzLatn: benefit.benefitType.name?.uzLatn || 'N/A',
                  },
                }
              : undefined,
            amount: benefit.amount,
            deductionAmount: benefit.deductionAmount,
          }))
        : undefined
    );
  },
};
