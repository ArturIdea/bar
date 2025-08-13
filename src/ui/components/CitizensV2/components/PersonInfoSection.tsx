'use client';

import {
  Box,
  Flex,
  Stack,
  Text,
} from '@mantine/core';

interface PersonData {
  surname: string;
  name: string;
  patronymic: string;
}

interface PersonInfoSectionProps {
  data: PersonData;
}

const NAMES = {
  surname: 'Familiyasi/Surname',
  name: 'Ismi/Given name(s)',
  patronymic: 'Otasining ismi/Patronymic',
};

export const PersonInfoSection = ({ data }: PersonInfoSectionProps) => {
  return (
    <Stack gap="sm">
      {Object.entries(NAMES).map(([key, label]) => (
        <Flex key={key} direction="column" gap="4px">
          <Box>
            <Text size="xs" c="#484848">
              {label}
            </Text>
          </Box>
          <Box flex={1}>
            <Text size="md" color="#000000" fw={500}>
              {data[key as keyof PersonData]}
            </Text>
          </Box>
        </Flex>
      ))}
    </Stack>
  );
};