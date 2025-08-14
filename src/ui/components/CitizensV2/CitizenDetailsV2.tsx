'use client';

import { Flex, Paper, Stack } from '@mantine/core';
import { AdditionalDetailsSection } from './components/AdditionalDetailsSection';
import { PersonInfoSection } from './components/PersonInfoSection';
import { PersonTypeSection } from './components/PersonTypeSection';
import { SocialNumberSection } from './components/SocialNumberSection';

export interface CitizenProps {
  id: string;
  socialNumber: string;
  pinfl: string;
  firstName: string;
  lastName: string;
  gender: string;
  nationality: string;
  dateOfIssue: string;
  placeOfBirth: string;
  enrolledAsStudent: boolean;
  universityName: string | null;
  hasDisabilities: boolean;
  disabilityGroup: string | null;
  disabilityReason: string | null;
  version: string;
  fingerprint: string | null;
  image: string | null;
}

export const CitizenDetailsV2 = ({ citizen }: { citizen: CitizenProps }) => {
  const getPersonType = () => {
    if (citizen.hasDisabilities) {
      return 'disability';
    }
    if (citizen.enrolledAsStudent) {
      return 'student';
    }
    return 'regular';
  };

  const personType = getPersonType();

  const adaptedData = {
    socialNumber: citizen.socialNumber,
    type: personType,
    surname: citizen.lastName,
    name: citizen.firstName,
    patronymic: '',
    gender: citizen.gender,
    citizenship: citizen.nationality,
    cardNumber: citizen.pinfl,
    personalNumber: citizen.pinfl,
    birthPlace: citizen.placeOfBirth,
    issuePlace: citizen.dateOfIssue,
    disabilityGroup: citizen.disabilityGroup,
    disabilityReason: citizen.disabilityReason,
    universityName: citizen.universityName,
  };

  return (
    <Paper p="md" bg="#E6E9F1" h="100vh">
      <Flex align="center" justify="center">
        <Stack gap="md" w="450px">
          <SocialNumberSection socialNumber={adaptedData.socialNumber} />
          <PersonTypeSection data={adaptedData} />
          <PersonInfoSection data={adaptedData} />
          <AdditionalDetailsSection data={adaptedData} />
        </Stack>
      </Flex>
    </Paper>
  );
};
