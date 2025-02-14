import { SignupRequestDetail } from '@/domain/signupRequests/entities/SignupRequestDetail';

export const SignupRequestDetailAdapter = {
  toDomain(raw: any): SignupRequestDetail {
    return new SignupRequestDetail(
      raw.id,
      raw.status,
      raw.registrationNumber,
      raw.deviceId,
      raw.firstName || 'N/A',
      raw.lastName,
      raw.email || 'N/A',
      raw.pinfl,
      raw.documentTypeId,
      raw.documentNumber,
      raw.dateOfBirth,
      raw.phoneCode || 'N/A',
      raw.phoneNumber,
      raw.phoneVerified,
      raw.tosAccepted,
      raw.tosText || 'N/A',
      raw.myIdFaceVerified,
      raw.privacyPolicyAccepted,
      raw.createdAt,
      raw.finalizedAt,
      raw.createdBy,
      raw.identityProviderData?.personDataLatin?.nationalityName || 'N/A',
      raw.identityProviderData?.personDataLatin?.citizenshipName || 'N/A',
      raw.identityProviderData?.personDataLatin?.documentType || 'N/A',
      raw.identityProviderData?.personDataLatin?.docSeria || 'N/A',
      raw.identityProviderData?.personDataLatin?.docIssueOn || 'N/A',
      raw.identityProviderData?.personDataLatin?.docExpireOn || 'N/A',
      raw.identityProviderData?.personDataLatin?.docIssueOrganization || 'N/A',
      raw.identityProviderData?.personDataLatin?.genderName || 'N/A',
      raw.identityProviderData?.personDataLatin?.birthCountryName || 'N/A',
      raw.identityProviderData?.personDataLatin?.address?.address || 'N/A'
    );
  },
};
