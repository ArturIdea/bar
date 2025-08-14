'use client';

import { Flex, Image, Paper, Stack } from '@mantine/core';
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

const personTypeConfig = {
  disability: {
    title: 'Person with disability',
    color: '#8B5CF6',
    bgColor: '#F3F0FF',
    icon: <Image src="/images/icons/disabledPerson.svg" alt="Disability Icon" />,
  },
  student: {
    title: 'Student',
    color: '#DC2626',
    bgColor: '#FEF2F2',
    icon: <Image src="/images/icons/student.svg" alt="Student Icon" />,
  },
  pensioner: {
    title: 'Pensioner',
    color: '#059669',
    bgColor: '#F0FDF4',
    icon: <Image src="/images/icons/pensioner.svg" alt="Pensioner Icon" />,
  },
  veteran: {
    title: 'Veteran',
    color: '#2563EB',
    bgColor: '#EFF6FF',
    icon: <Image src="/images/icons/veteran.svg" alt="Veteran Icon" />,
  },
};

export const CitizenDetailsV2 = ({ citizen }: { citizen: CitizenProps }) => {
  const getPersonType = () => {
    if (citizen.hasDisabilities) {
      return 'disability';
    }
    if (citizen.enrolledAsStudent) {
      return 'student';
    }
    return 'disability';
  };

  const personType = getPersonType();
  const config = personTypeConfig[personType];

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
  };

  return (
    <Paper p="md" bg="#E6E9F1" h="100vh">
      <Flex align="center" justify="center">
        <Stack gap="md" w="450px">
          <SocialNumberSection socialNumber={adaptedData.socialNumber} />
          <PersonTypeSection data={adaptedData} config={config} />
          <PersonInfoSection data={adaptedData} />
          <AdditionalDetailsSection data={adaptedData} />
        </Stack>
      </Flex>
    </Paper>
  );
};
