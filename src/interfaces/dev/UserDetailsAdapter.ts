import {
  Address,
  DisabilityData,
  IdentityProviderData,
  MarriageData,
  PersonDataLatin,
  StudentOnboarding,
  UserDetail,
} from '@/domain/users/dev/entities/UserDetail';

export const UserDetailsAdapter = {
  toDomain(raw: any): UserDetail {
    const address = raw.identityProviderData?.personDataLatin?.address
      ? new Address(
          raw.identityProviderData.personDataLatin.address.countryId,
          raw.identityProviderData.personDataLatin.address.country,
          raw.identityProviderData.personDataLatin.address.regionId,
          raw.identityProviderData.personDataLatin.address.region,
          raw.identityProviderData.personDataLatin.address.districtId,
          raw.identityProviderData.personDataLatin.address.district,
          raw.identityProviderData.personDataLatin.address.mfyId,
          raw.identityProviderData.personDataLatin.address.mfy,
          raw.identityProviderData.personDataLatin.address.address,
          raw.identityProviderData.personDataLatin.address.isTemporary,
          raw.identityProviderData.personDataLatin.address.temporaryResidenceTypeId,
          raw.identityProviderData.personDataLatin.address.temporaryResidenceType,
          raw.identityProviderData.personDataLatin.address.temporaryCountryId,
          raw.identityProviderData.personDataLatin.address.temporaryCountry,
          raw.identityProviderData.personDataLatin.address.temporaryRegionId,
          raw.identityProviderData.personDataLatin.address.temporaryRegion,
          raw.identityProviderData.personDataLatin.address.temporaryDistrictId,
          raw.identityProviderData.personDataLatin.address.temporaryDistrict,
          raw.identityProviderData.personDataLatin.address.temporaryMfyId,
          raw.identityProviderData.personDataLatin.address.temporaryMfy,
          raw.identityProviderData.personDataLatin.address.temporaryAddress,
          raw.identityProviderData.personDataLatin.address.temporaryCadastre,
          raw.identityProviderData.personDataLatin.address.temporaryDateFrom,
          raw.identityProviderData.personDataLatin.address.temporaryDateTill
        )
      : undefined;

    const personDataLatin = raw.identityProviderData?.personDataLatin
      ? new PersonDataLatin(
          raw.identityProviderData.personDataLatin.socialNumber,
          raw.identityProviderData.personDataLatin.genderName,
          raw.identityProviderData.personDataLatin.nationalityName,
          raw.identityProviderData.personDataLatin.citizenshipName,
          raw.identityProviderData.personDataLatin.documentType,
          raw.identityProviderData.personDataLatin.birthDateAsString,
          raw.identityProviderData.personDataLatin.birthCountryId,
          raw.identityProviderData.personDataLatin.birthPlace,
          raw.identityProviderData.personDataLatin.birthCountryName,
          raw.identityProviderData.personDataLatin.firstName,
          raw.identityProviderData.personDataLatin.middleName,
          raw.identityProviderData.personDataLatin.lastName,
          raw.identityProviderData.personDataLatin.emailAddress,
          raw.identityProviderData.personDataLatin.phoneNumber,
          raw.identityProviderData.personDataLatin.nationalityId,
          raw.identityProviderData.personDataLatin.citizenshipId,
          raw.identityProviderData.personDataLatin.documentTypeId,
          raw.identityProviderData.personDataLatin.pinfl,
          raw.identityProviderData.personDataLatin.docSeria,
          raw.identityProviderData.personDataLatin.docNumber,
          raw.identityProviderData.personDataLatin.birthOn,
          raw.identityProviderData.personDataLatin.docIssueOn,
          raw.identityProviderData.personDataLatin.docExpireOn,
          raw.identityProviderData.personDataLatin.docIssueOrganization,
          raw.identityProviderData.personDataLatin.genderId,
          raw.identityProviderData.personDataLatin.isDeath,
          raw.identityProviderData.personDataLatin.deathOn,
          address
        )
      : undefined;

    const marriageData = raw.identityProviderData?.marriageData
      ? new MarriageData(
          raw.identityProviderData.marriageData.docNumber,
          raw.identityProviderData.marriageData.docOn,
          raw.identityProviderData.marriageData.branch,
          raw.identityProviderData.marriageData.certSeries,
          raw.identityProviderData.marriageData.certNumber,
          raw.identityProviderData.marriageData.certDate,
          raw.identityProviderData.marriageData.husbandFamily,
          raw.identityProviderData.marriageData.husbandFamilyAfter,
          raw.identityProviderData.marriageData.husbandFirstName,
          raw.identityProviderData.marriageData.husbandPatronym,
          raw.identityProviderData.marriageData.husbandBirthDay,
          raw.identityProviderData.marriageData.husbandAddress,
          raw.identityProviderData.marriageData.husbandCitizen,
          raw.identityProviderData.marriageData.husbandPinfl,
          raw.identityProviderData.marriageData.wifeFamily,
          raw.identityProviderData.marriageData.wifeFamilyAfter,
          raw.identityProviderData.marriageData.wifeFirstName,
          raw.identityProviderData.marriageData.wifePatronym,
          raw.identityProviderData.marriageData.wifeBirthDay,
          raw.identityProviderData.marriageData.wifeAddress,
          raw.identityProviderData.marriageData.wifeCitizen,
          raw.identityProviderData.marriageData.wifePinfl
        )
      : undefined;

    const disabilityData = raw.identityProviderData?.disabilityData
      ? new DisabilityData(
          raw.identityProviderData.disabilityData.pinfl,
          raw.identityProviderData.disabilityData.surname,
          raw.identityProviderData.disabilityData.name,
          raw.identityProviderData.disabilityData.partonym,
          raw.identityProviderData.disabilityData.passportNumber,
          raw.identityProviderData.disabilityData.sex,
          raw.identityProviderData.disabilityData.birthDate,
          raw.identityProviderData.disabilityData.disabilityGroup,
          raw.identityProviderData.disabilityData.nBlind,
          raw.identityProviderData.disabilityData.disabilityReason,
          raw.identityProviderData.disabilityData.disabilityPercentage,
          raw.identityProviderData.disabilityData.disabilityDateStart,
          raw.identityProviderData.disabilityData.disabilityDateEnd,
          raw.identityProviderData.disabilityData.referenceNumber,
          raw.identityProviderData.disabilityData.ekriteria1,
          raw.identityProviderData.disabilityData.ekriteria2,
          raw.identityProviderData.disabilityData.ekriteria3,
          raw.identityProviderData.disabilityData.ekriteria4,
          raw.identityProviderData.disabilityData.ekriteria5,
          raw.identityProviderData.disabilityData.ekriteria6,
          raw.identityProviderData.disabilityData.ekriteria7,
          raw.identityProviderData.disabilityData.parasportRecom,
          raw.identityProviderData.disabilityData.professionRecom,
          raw.identityProviderData.disabilityData.icd10,
          raw.identityProviderData.disabilityData.epdate
        )
      : undefined;

    const identityProviderData = raw.identityProviderData
      ? new IdentityProviderData(personDataLatin, marriageData, disabilityData)
      : undefined;

    const studentOnboarding = raw.studentOnboarding
      ? new StudentOnboarding(
          raw.studentOnboarding.hasBeenEnrolledAsStudent,
          raw.studentOnboarding.universityName
        )
      : undefined;
    const agentData = raw.agentData;
    const userPhoto = raw.userPhoto;
    const userSignedData = raw.userSignedData;
    const userCardFront = raw.userCardFront;

    return new UserDetail(
      raw.userId,
      raw.keycloakUserId,
      raw.authApiUserId,
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
      identityProviderData,
      studentOnboarding,
      agentData,
      userPhoto,
      userSignedData,
      userCardFront
    );
  },
};
