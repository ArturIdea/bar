'use client';

import { Card, Flex, SimpleGrid, Text } from '@mantine/core';
import { Citizen } from '@/domain/citizen/entities/Citizen';
import { useMobileBreakpoint } from '@/ui/hooks/ui/useMobileBreakPoint';

interface ProfileImageProps {
  citizen: Citizen;
}

const BasicInfoSection = ({ citizen }: ProfileImageProps) => {
  const isMobile = useMobileBreakpoint(600);
  return (
    <Card w="100%" withBorder radius="lg">
      <Flex w="100%" p={32}>
        <SimpleGrid cols={isMobile ? 1 : 2} m="auto" style={{ columnGap: 80 }}>
          <Flex direction="column" rowGap={8}>
            <Text c="dimmed" size="sm">
              Gender
            </Text>
            <Text fw={500}>{citizen.gender}</Text>
          </Flex>
          <Flex direction="column" rowGap={8}>
            <Text size="sm" c="dimmed">
              Nationality
            </Text>
            <Text fw={500}>{citizen.nationality}</Text>
          </Flex>
          <Flex direction="column" rowGap={8}>
            <Text size="sm" c="dimmed">
              Social Number
            </Text>
            <Text fw={500}>{citizen.socialNumber}</Text>
          </Flex>
          <Flex direction="column" rowGap={8}>
            <Text size="sm" c="dimmed">
              PINFL
            </Text>
            <Text fw={500}>{citizen.pinfl}</Text>
          </Flex>
          <Flex direction="column" rowGap={8}>
            <Text size="sm" c="dimmed">
              Date of issue
            </Text>
            <Text fw={500}>{citizen.dateOfIssue}</Text>
          </Flex>
          <Flex direction="column" rowGap={8}>
            <Text size="sm" c="dimmed">
              Place of birth
            </Text>
            <Text fw={500}>{citizen.placeOfBirth}</Text>
          </Flex>
          <Flex direction="column" rowGap={8}>
            <Text size="sm" c="dimmed">
              Fingerprint
            </Text>
            <Text
              style={{ borderRadius: 10 }}
              px={4}
              py={2}
              w="fit-content"
              size="xs"
              bg={citizen.fingerprint ? 'yellow' : 'transparent'}
              c="white"
              fw={500}
            >
              {citizen.fingerprint ?? '-'}
            </Text>
          </Flex>
        </SimpleGrid>
      </Flex>
    </Card>
  );
};
export default BasicInfoSection;
