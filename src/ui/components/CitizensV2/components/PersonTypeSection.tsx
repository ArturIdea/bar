'use client';

import { Box, Flex, Group, Image, Text } from '@mantine/core';

interface PersonTypeConfig {
  title: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}

interface PersonTypeData {
  type: 'disability' | 'student' | 'regular' | 'pensioner' | 'veteran' | (string & {});
  disabilityGroup?: string | null;
  disabilityReason?: string | null;
  universityName?: string | null;
}
const personTypeConfig: Record<string, PersonTypeConfig> = {
  disability: {
    title: 'Person with disability',
    color: '#280067',
    bgColor: '#DADFFF',
    icon: <Image src="/images/icons/disabledPerson.svg" alt="Disability Icon" />,
  },
  student: {
    title: 'Student',
    color: '#640000',
    bgColor: '#FFF7EB',
    icon: <Image src="/images/icons/student.svg" alt="Student Icon" />,
  },
  regular: {
    title: 'No benefits',
    color: '#050718',
    bgColor: '#F9FAFB',
    icon: <Image src="/images/icons/citizen.svg" alt="Regular Citizen Icon" />,
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

interface PersonTypeSectionProps {
  data: PersonTypeData;
}

export const PersonTypeSection = ({ data }: PersonTypeSectionProps) => {
  const config = personTypeConfig[data.type || 'regular'];

  return (
    <Box
      style={{
        backgroundColor: config.bgColor,
        marginInline: '-16px',
        padding: '16px 26px 16px 26px',
      }}
    >
      <Group gap="xs">
        <Text size="lg">{config.icon}</Text>
        <Text fw={600} c={config.color} size="20px">
          {config.title}
        </Text>
      </Group>

      {data.type === 'disability' && (
        <Flex direction="column" gap="sm" mt="md">
          <Flex justify="space-between" gap="xs">
            <Text size="sm" c="#070707">
              Reason
            </Text>
            <Text size="sm" fw={500}>
              {data.disabilityReason || 'Not specified'}
            </Text>
          </Flex>
          <Flex justify="space-between" gap="xs">
            <Text size="sm" c="#070707">
              Group
            </Text>
            <Text size="sm" fw={500}>
              {data.disabilityGroup || 'Not specified'}
            </Text>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};
