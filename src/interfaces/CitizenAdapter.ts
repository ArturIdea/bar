import { Citizen } from '@/domain/citizen/entities/Citizen';

export const CitizenAdapter = {
  toDomain: (rawCitizen: any) => {
    return new Citizen(
      rawCitizen.id,
      rawCitizen.socialNumber,
      rawCitizen.pinfl,
      rawCitizen.firstName,
      rawCitizen.lastName,
      rawCitizen.gender,
      rawCitizen.nationality,
      rawCitizen.dateOfIssue,
      rawCitizen.placeOfBirth,
      rawCitizen.enrolledAsStudent,
      rawCitizen.universityName,
      rawCitizen.hasDisabilities,
      rawCitizen.disabilityGroup,
      rawCitizen.disabilityReason,
      rawCitizen.version,
      rawCitizen.fingerprint,
      rawCitizen.image
    );
  },
};
