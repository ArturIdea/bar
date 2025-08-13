'use client';

import {
  Box,
  Flex,
  Stack,
  Text,
} from '@mantine/core';

interface AdditionalData {
  gender: string;
  citizenship: string;
  cardNumber: string;
  personalNumber: string;
  birthPlace: string;
  issuePlace: string;
}

interface AdditionalDetailsSectionProps {
  data: AdditionalData;
}

export const AdditionalDetailsSection = ({ data }: AdditionalDetailsSectionProps) => {
  const additionalFields = [
    { key: 'gender', label: 'Jinsi/Sex', value: data.gender },
    { key: 'citizenship', label: 'Fuqaroligi/Citizenship', value: data.citizenship },
    { key: 'cardNumber', label: 'Karta raqami/Card number', value: data.cardNumber },
    { key: 'personalNumber', label: 'Shaxsiy raqam / personal number', value: data.personalNumber },
    { key: 'birthPlace', label: "Tug'ilgan joyi / Place of birth", value: data.birthPlace },
    { key: 'issuePlace', label: 'Berilgan joyi / Place of issue', value: data.issuePlace },
  ];

  return (
    <Stack gap="sm">
      {additionalFields.map((field) => (
        <Flex key={field.key} direction="row" gap="4px" justify="space-between" align="center">
          <Box>
            <Text size="xs" c="#484848">
              {field.label}
            </Text>
          </Box>
          <Box>
            <Text size="sm" color="#000000" fw={500}>
              {field.value}
            </Text>
          </Box>
        </Flex>
      ))}
    </Stack>
  );
};