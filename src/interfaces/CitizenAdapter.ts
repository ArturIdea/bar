import { Citizen } from '@/domain/citizen/entities/Citizen';

export const CitizenAdapter = {
  toDomain: (rawCitizen: any) => {
    return new Citizen(
      rawCitizen.id,
      rawCitizen.socialNumber,
      rawCitizen.pnfl,
      rawCitizen.firstName,
      rawCitizen.lastName,
      rawCitizen.gender,
      rawCitizen.nationality,
      rawCitizen.dateOfIssue,
      rawCitizen.placeOfBirth,
      rawCitizen.version,
      rawCitizen.fingerprint,
      rawCitizen.image
    );
  },
};
